export function json(data, init = {}) {
  return Response.json(data, init);
}

export function created(data) {
  return json(data, {
    status: 201,
  });
}

export function badRequest(message, details) {
  return json(
    {
      error: message,
      details,
    },
    {
      status: 400,
    }
  );
}

export function notFound(message = "Resource not found.") {
  return json(
    {
      error: message,
    },
    {
      status: 404,
    }
  );
}

export function noContent() {
  return new Response(null, {
    status: 204,
  });
}

export async function readJson(request) {
  try {
    return {
      data: await request.json(),
    };
  } catch {
    return {
      response: badRequest("Invalid JSON body."),
    };
  }
}

export function handleRouteError(error) {
  console.error(error);

  return json(
    {
      error: "Server error.",
    },
    {
      status: 500,
    }
  );
}

export function validate(schema, data) {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    return {
      response: badRequest(
        "Validation failed.",
        parsed.error.flatten()
      ),
    };
  }

  return {
    data: parsed.data,
  };
}

export function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function normalizeStringArray(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function normalizeCommaSeparatedList(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function normalizeParagraphList(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\n+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function toDateString(value) {
  if (!value) {
    return null;
  }

  return new Date(value).toISOString().slice(0, 10);
}
