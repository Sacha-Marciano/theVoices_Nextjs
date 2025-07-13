// Models for validation and structure reference

export const SingerModel = {
  name: 'string',
  image: 'string', // URL or filename
  role: 'string',
};

export const OptionModel = {
  name: { en: 'string', fr: 'string', he: 'string' },
  description: { en: 'string', fr: 'string', he: 'string' },
  image: 'string', // URL or filename
};

export const ConceptModel = {
  name: { en: 'string', fr: 'string', he: 'string' },
  image: 'string', // URL or filename
  info: 'array', // Array of objects with multilingual title and description
};

export const VideoModel = {
  title: 'string',
  url: 'string',
};

export const PictureModel = {
  url: 'string',
}; 