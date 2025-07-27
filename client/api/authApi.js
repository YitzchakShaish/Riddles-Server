export let token;
export async function signup(username, password, role) {
  const res = await fetch("http://localhost:3000/signup", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
        role: role
    })
  });
  return  res;
 
};


export async function login(username, password) {
  const res = await fetch("http://localhost:3000/login", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password
    })
  });

  const data = await res.json(); 

  if (res.ok) {
    if (data.token) {
      token = data.token;
    }

    return {
      status: res.status,
      message: data.message || 'Login succeeded',
      data: data || null 
    };
  } else {
    return {
      name: data.name,
      status: res.status,
      message: data.message || 'Login failed',
      playerId: data.playerId || null,
      role: data.role || null
    };
  }
}


// const data = await login("m8di", "1234");
// token = data.token;
// console.log(`data`, data);

// console.log(`token`, token);


export async function authFetch(url, options = {}) {
  

  const headers = {
    ...(options.headers || {}),
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };

  return fetch(url, {
    ...options,
    headers
  });
}


//, "Authorization": `Bearer ${token}`