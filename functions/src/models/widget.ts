import Firebase from "firebase-admin";
import { dateConverter } from "../utils/firestoreConverters";

/**
 * Widget input
 */
export interface WidgetInput {
  uid?: string;
  createdAt?: Date;
  updatedAt?: Date;
  title?: string;
  description?: string;
}

/**
 * Widget model
 */
export default class Widget implements WidgetInput {
  uid?: string;
  createdAt?: Date;
  updatedAt?: Date;
  title?: string;
  description?: string;

  constructor(widget: WidgetInput = {}) {
    this.uid = widget.uid;
    this.title = widget.title;
    this.createdAt =
      (widget.createdAt && new Date(widget.createdAt)) || new Date();
    this.updatedAt =
      (widget.updatedAt && new Date(widget.updatedAt)) || new Date();
    this.description = widget.description;
  }

  /**
   * @param {WidgetInput} input Widget data
   * @return {Promise<Widget>} A widget
   * @throws {Error} If the widget could not be created
   */
  static async create(input: WidgetInput) {
    const Firestore = Firebase.firestore();
    const collection = "widgets";

    console.log(`Creating ${collection} from`, input);

    // create an item with given input
    const data = new Widget(input);

    // save the new item
    const newDocument = Firestore.collection(collection).doc();
    data.uid = newDocument.id;
    await newDocument.withConverter(dateConverter).set(data);

    // re-fetch the item, Firebase doesn't return the saved item
    const itemSnapshot = await newDocument.withConverter(dateConverter).get();
    const savedData = itemSnapshot.data();
    savedData.uid = itemSnapshot.id;

    // create the final item from the fresh data
    const item = new Widget(savedData);

    console.log(`Created ${collection}`, item);

    return item;
  }

  /**
   * @param {string} uid
   * @return {Promise<Widget | undefined>} A widget or undefined
   * @throws {Error} If something unexpected happens
   */
  static async findById(uid: string): Promise<Widget | undefined> {
    const Firestore = Firebase.firestore();
    const collection = "widgets";

    console.log(`Reading ${collection}/${uid}`);

    // get the resource item
    const itemSnapshot = await Firestore.collection(collection)
      .doc(uid)
      .withConverter(dateConverter)
      .get();
    const data = itemSnapshot.data();

    if (!data) {
      return undefined;
    }

    // use Firebase's id as the uid
    data.uid = itemSnapshot.id;
    const item = new Widget(data);

    console.log(`Found ${collection}/${data.uid}`, item.uid);

    // return the item
    return item;
  }

  /**
   * @return {Promise<Widget[]>} A list of widgets
   * @throws {Error} If something unexpected happens
   */
  static async find() {
    const Firestore = Firebase.firestore();
    const collection = "widgets";

    console.log(`Searching ${collection}`);

    // get the widgets
    const itemSnapshot = await Firestore.collection(collection)
      .withConverter(dateConverter)
      .orderBy("createdAt", "desc")
      .get();
    const widgets = itemSnapshot.docs.map((doc) => {
      const item = doc.data();
      item.uid = doc.id;
      const widget = new Widget(item);
      return widget;
    });

    console.log(`Found ${widgets}`, widgets);

    // return the item
    return widgets;
  }
}
