import { PictureService } from '../../../database/services';
import { PictureModel } from '../../../database/models';

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
    const picture = await PictureService.getById(id);
    if (!picture) return new Response('Not found', { status: 404 });
    return Response.json(picture);
  }
  const pictures = await PictureService.getAll();
  return Response.json(pictures);
}

export async function POST(request) {
  const data = await request.json();
  if (!validate(data, PictureModel)) {
    return new Response('Invalid data', { status: 400 });
  }
  const created = await PictureService.create(data);
  return Response.json(created);
}

export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return new Response('Missing id', { status: 400 });
  const data = await request.json();
  if (!validate(data, PictureModel)) {
    return new Response('Invalid data', { status: 400 });
  }
  const updated = await PictureService.update(id, data);
  return Response.json(updated);
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return new Response('Missing id', { status: 400 });
  await PictureService.delete(id);
  return new Response('Deleted', { status: 204 });
} 