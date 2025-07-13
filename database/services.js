import { connectToDb } from '../lib/mongodb';

// Generic CRUD service factory
function createCrudService(collectionName) {
  return {
    async create(data) {
      const client = await connectToDb();
      const db = client.db();
      const result = await db.collection(collectionName).insertOne(data);
      return result.ops?.[0] || { _id: result.insertedId, ...data };
    },
    async getAll() {
      const client = await connectToDb();
      const db = client.db();
      return db.collection(collectionName).find({}).toArray();
    },
    async getById(id) {
      const client = await connectToDb();
      const db = client.db();
      const { ObjectId } = await import('mongodb');
      return db.collection(collectionName).findOne({ _id: new ObjectId(id) });
    },
    async update(id, data) {
      const client = await connectToDb();
      const db = client.db();
      const { ObjectId } = await import('mongodb');
      
      // Remove _id from data to avoid MongoDB error about immutable field
      const { _id, ...updateData } = data;
      
      const result = await db.collection(collectionName).updateOne({ _id: new ObjectId(id) }, { $set: updateData });
      const updated = await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
      return updated;
    },
    async delete(id) {
      const client = await connectToDb();
      const db = client.db();
      const { ObjectId } = await import('mongodb');
      const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });
      return result;
    },
  };
}

export const SingerService = createCrudService('singers');
export const OptionService = createCrudService('options');
export const ConceptService = createCrudService('concepts');
export const VideoService = createCrudService('videos');
export const PictureService = createCrudService('pictures'); 