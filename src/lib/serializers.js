export function serializeBlog(row) {
  return {
    id: row.id,
    _id: row.id,
    slug: row.slug,
    title: row.title,
    image: row.image,
    date: row.display_date,
    category: row.category,
    author: row.author,
    readTime: row.read_time,
    tags: row.tags || [],
    quote: row.quote,
    introduction: row.introduction || [],
    sections: row.sections || [],
    published: row.published,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function serializeStaff(row) {
  return {
    id: row.id,
    _id: row.id,
    fullName: row.full_name,
    role: row.role,
    email: row.email,
    phone: row.phone,
    department: row.department,
    address: row.address,
    bio: row.bio,
    image: row.image,
    category: row.category,
    featured: row.featured,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function serializeReport(row) {
  return {
    id: row.id,
    _id: row.id,
    title: row.title,
    year: row.year,
    category: row.category,
    description: row.description,
    link: row.link,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function serializeEvent(row) {
  return {
    id: row.id,
    _id: row.id,
    title: row.title,
    category: row.category,
    date: row.event_date,
    location: row.location,
    image: row.image,
    description: row.description,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function serializeContactMessage(row) {
  return {
    id: row.id,
    _id: row.id,
    name: row.name,
    email: row.email,
    subject: row.subject,
    message: row.message,
    read: row.read,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function serializeRegistration(row) {
  return {
    id: row.id,
    _id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    location: row.location,
    role: row.role,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
