import * as functions from "firebase-functions";
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

export const createUserDocument = functions.auth.user().onCreate((user) => {
	db.collection("users")
		.doc(user.uid)
		.set(JSON.parse(JSON.stringify(user)));
});

export const deleteReports = functions.firestore.document("students/{studentID}").onDelete((change, context) => {
	deleteCollection(db, "students/{studentID}/reports/", 4);
});

// From Google Documentation for deleting Collection
// https://firebase.google.com/docs/firestore/manage-data/delete-data
async function deleteCollection(db: any, collectionPath: string, batchSize: number) {
	const collectionRef = db.collection(collectionPath);
	const query = collectionRef.orderBy("__name__").limit(batchSize);

	return new Promise((resolve, reject) => {
		deleteQueryBatch(db, query, resolve).catch(reject);
	});
}

async function deleteQueryBatch(db: any, query: any, resolve: any) {
	const snapshot = await query.get();

	const batchSize = snapshot.size;
	if (batchSize === 0) {
		// When there are no documents left, we are done
		resolve();
		return;
	}

	// Delete documents in a batch
	const batch = db.batch();
	snapshot.docs.forEach((doc: any) => {
		batch.delete(doc.ref);
	});
	await batch.commit();

	// Recurse on the next process tick, to avoid
	// exploding the stack.
	process.nextTick(() => {
		deleteQueryBatch(db, query, resolve);
	});
}
