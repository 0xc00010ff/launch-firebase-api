import { Timestamp } from "firebase-admin/firestore";

interface ObjectWithAutoTimestamps {
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const dateConverter = {
  toFirestore(
    object: ObjectWithAutoTimestamps
  ): FirebaseFirestore.DocumentData {
    const updatedObject = { ...object };
    if (updatedObject.createdAt instanceof Date) {
      updatedObject.createdAt = Timestamp.fromDate(updatedObject.createdAt);
    }
    if (updatedObject.updatedAt instanceof Date) {
      updatedObject.updatedAt = Timestamp.fromDate(updatedObject.updatedAt);
    }
    return updatedObject;
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): any {
    const data = snapshot.data();
    if (data.createdAt instanceof Timestamp) {
      data.createdAt = data.createdAt.toDate();
    }
    if (data.updatedAt instanceof Timestamp) {
      data.updatedAt = data.updatedAt.toDate();
    }
    return data;
  },
};
