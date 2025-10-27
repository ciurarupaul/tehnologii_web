const apiUrl = "http://localhost:8000/api";

async function get(url) {
  return (await axios.get(url)).data;
}

async function post(url, body) {
  return (
    await axios.post(url, JSON.stringify(body), {
      headers: { "Content-Type": "application/json" },
    })
  ).data;
}

async function loadTable() {
  const data = await get(apiUrl + "/getList");
  const tableDiv = document.getElementById("tableData");

  if (!data || !tableDiv) return;

  const myTable = document.getElementById("myTable");
  if (myTable) myTable.remove();

  const myHtmlCode = [];

  myHtmlCode.push("<table id='myTable'>");
  myHtmlCode.push("<thead>");
  myHtmlCode.push(
    "<tr> <th hidden> Id </th> <th> Name </th> <th> Age </th> </tr>"
  );
  myHtmlCode.push("</thead>");
  myHtmlCode.push("<tbody>");

  for (const item of data) {
    myHtmlCode.push(
      `<tr> <td hidden> ${item.id} </td> <td> ${item.name} </td> <td> ${item.age} </td></tr>`
    );
  }

  myHtmlCode.push("</tbody>");
  myHtmlCode.push("</table>");

  tableDiv.innerHTML = myHtmlCode.join("");
}

async function sendData() {
  const name = document.getElementById("inputName").value;
  const age = document.getElementById("inputAge").value;

  if (!name || !age) {
    alert("Completeaza toate campurile!");
    return;
  }

  await post(apiUrl + "/postList", { name, age });
  await loadTable();
}

async function getDataById() {
  const id = document.getElementById("inputId").value;
  const resultDiv = document.getElementById("resultData");

  if (!id) {
    alert("Introduceti un id valid!");
    return;
  }

  try {
    const data = await get(apiUrl + "/getList/" + id);

    if (data) {
      resultDiv.innerHTML = `
        <p>Nume: ${data.name}</p>
        <p>Varsta: ${data.age}</p>
      `;
    } else {
      resultDiv.innerHTML = `<p>Resursa cu id-ul ${id} nu a fost gasita</p>`;
    }
  } catch (error) {
    console.error(error.message);
    resultDiv.innerHTML = `<p>Resursa cu id-ul ${id} nu a fost gasita</p>`;
  }
}

loadTable();

//  După ce ați testat exemplul, implementați un formular care face o cerere pentru o resursă un anumit id și afișează rezultatul.
