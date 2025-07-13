import { VideoService } from '../../../database/services';
import { VideoModel } from '../../../database/models';

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
    const video = await VideoService.getById(id);
    if (!video) return new Response('Not found', { status: 404 });
    return Response.json(video);
  }
  const videos = await VideoService.getAll();
  return Response.json(videos);
}

export async function POST(request) {
  const data = await request.json();
  if (!validate(data, VideoModel)) {
    return new Response('Invalid data', { status: 400 });
  }
  const created = await VideoService.create(data);
  return Response.json(created);
}

export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return new Response('Missing id', { status: 400 });
  const data = await request.json();
  if (!validate(data, VideoModel)) {
    return new Response('Invalid data', { status: 400 });
  }
  const updated = await VideoService.update(id, data);
  return Response.json(updated);
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return new Response('Missing id', { status: 400 });
  await VideoService.delete(id);
  return new Response('Deleted', { status: 200 });
} 