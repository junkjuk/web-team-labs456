export async function get(url: string) {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    }
  });
  const data = await res.json();
  return data.data;
}

export async function patch(url: string, value: any) {
  try {
    const body = JSON.stringify(value);
    console.log(body);
    const res = await fetch(url, {
      method: 'PATCH',
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
}

export async function post(url: string, value: any) {
  try {
    const body = JSON.stringify(value);
    console.log(body);
    const res = await fetch(url, {
      method: 'POST',
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ username: "example" }),
    });
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
}

export async function remove(url: string) {
  await fetch(url, {
    method: 'DELETE',
  });
}