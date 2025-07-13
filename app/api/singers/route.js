import { SingerService } from '../../../database/services';
import { SingerModel } from '../../../database/models';

function validate(data, model) {
  for (const key in model) {
    if (typeof data[key] !== model[key]) {
      return false;
    }
  }
  return true;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (id) {
    const singer = await SingerService.getById(id);
    if (!singer) return new Response('Not found', { status: 404 });
    return Response.json(singer);
  }
  const singers = await SingerService.getAll();
  return Response.json(singers);
}

export async function POST(request) {
  const data = await request.json();
  if (!validate(data, SingerModel)) {
    return new Response('Invalid data', { status: 400 });
  }
  const created = await SingerService.create(data);
  return Response.json(created);
}

export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return new Response('Missing id', { status: 400 });
  const data = await request.json();
  if (!validate(data, SingerModel)) {
    return new Response('Invalid data', { status: 400 });
  }
  const updated = await SingerService.update(id, data);
  return Response.json(updated);
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return new Response('Missing id', { status: 400 });
  await SingerService.delete(id);
  return new Response('Deleted', { status: 200 });
} 