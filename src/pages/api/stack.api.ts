import {
  collection,
  getDocs,
  orderBy,
  query,
  startAt,
  doc,
  limit,
  writeBatch,
  where,
  PartialWithFieldValue,
} from "firebase/firestore";
import { db } from "@/config/firebase-config";

export const getStackList =
  (pageSize: number = 10) =>
  async (page: number = 0, search?: string) => {
    try {
      const q = query(
        collection(db, "stack"),
        orderBy("value"),
        where("value", ">=", search),
        where("value", "<=", search + "\uf8ff"),
        startAt(page * pageSize),
        limit(pageSize)
      );
      const querySnapshot = await getDocs(q);
      const stackList: Stack[] = [];
      querySnapshot.forEach((stack) => stackList.push(stack.data() as Stack));
      return stackList;
    } catch (e) {
      console.error("fail to get post list : ", e);
    }
  };

export const createStacks = async (newStacks: Stack[]) => {
  try {
    // Get a new write batch
    const batch = writeBatch(db);

    newStacks.forEach(async (stack) => {
      await batch.set(doc(db, "stack", stack.value), stack, {
        merge: true,
      });
    });

    await batch.commit();
  } catch (e) {
    console.error("fail to create stack : ", e);
  }
};
