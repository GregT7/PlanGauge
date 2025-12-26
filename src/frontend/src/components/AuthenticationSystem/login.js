export async function login(url, email, password) {
  let resp = {ok: null, message: null, details: null, body: null}
  try {
    const pass_msg = "Login was successful!"
    const fail_msg = "Login attempt failed!"

    const login_resp = await fetch(url, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" }
    })
    const body = await login_resp.json();

    if (login_resp?.ok) {
      resp.ok = true
      resp.message = pass_msg;
      resp.details = login_resp
      resp.body = body;
      return Promise.resolve(resp);
    }
    resp.ok = false;
    resp.message = fail_msg;
    resp.details = login_resp
    return Promise.reject(resp);
  } catch (e) {
    resp.ok = false
    resp.message = "Error: There was an error while logging in!"
    resp.details = e;
    return Promise.reject(resp);
  }
}