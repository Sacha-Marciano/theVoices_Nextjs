import { OptionService } from '../../../database/services';
import { OptionModel } from '../../../database/models';

function validate(data, model) {
  for (const key in model) {
    if (model[key] === 'string') {
      if (typeof data[key] !== 'string') {
        return false;
      }
    } else if (model[key] === 'array') {
      if (!Array.isArray(data[key])) {
        return false;
      }
    } else if (typeof model[key] === 'object' && model[key] !== null) {
      // Handle multilingual fields
      if (typeof data[key] !== 'object' || data[key] === null) {
        return false;
      }
      // Check if all required language keys exist
      for (const lang in model[key]) {
        if (typeof data[key][lang] !== model[key][lang]) {
          return false;
        }
      }
    }
  }
  return true;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (id) {
    const option = await OptionService.getById(id);
    if (!option) return new Response('Not found', { status: 404 });
    return Response.json(option);
  }
  const options = await OptionService.getAll();
  return Response.json(options);
}

export async function POST(request) {
  const data = await request.json();
  
  if (!validate(data, OptionModel)) {
    return new Response('Invalid data', { status: 400 });
  }
  
  const created = await OptionService.create(data);
  return Response.json(created);
}

export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return new Response('Missing id', { status: 400 });
  const data = await request.json();
  
  if (!validate(data, OptionModel)) {
    return new Response('Invalid data', { status: 400 });
  }
  
  const updated = await OptionService.update(id, data);
  return Response.json(updated);
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return new Response('Missing id', { status: 400 });
  await OptionService.delete(id);
  return new Response('Deleted', { status: 200 });
} 