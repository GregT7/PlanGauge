export async function logout(url) {
  let funcResp = {ok: null, message: null, details: null, body: null}
  try {
    const pass_msg = "Logout was successful!"
    const fail_msg = "Logout attempt failed!"

    const logoutResp = await fetch(url, {
      credentials: "include",
      method: "POST"
    })

    const data = await logoutResp.json();
    funcResp.details = logoutResp
    funcResp.body = data;
    if (logoutResp?.ok) {
      funcResp.ok = true
      funcResp.message = pass_msg;
      return Promise.resolve(funcResp);
    }
    funcResp.ok = false;
    funcResp.message = fail_msg;
    return Promise.reject(funcResp);
  } catch (e) {
    funcResp.ok = false
    funcResp.message = e.message
    funcResp.details = e;
    return Promise.reject(funcResp);
  }
}