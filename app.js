const app = document.querySelector('#app');
const API = 'https://acme-users-api-rev.herokuapp.com/api/users/search/Glo';

const createNode = (type) => document.createElement(type);

fetch(API)
    .then(response => {
        return response.json()
    })
    .then( data => {
        console.log(data);
        render(data.users);
    })

const pageHeader = () => {
    const pageName = createNode('h1');
    pageName.innerText = 'Acme User Search';
    app.append(pageName);
    return pageName;
}

const tableCreator = (users) => {
    const table = createNode('table');

    const tableHeader = createNode('thead');
    const header = tableHeaderCreator();
    tableHeader.append(header);

    const tableBody = createNode('tbody');
    const rows = users.map( user => {
        const row = rowCreator(user);
        tableBody.append(row);
    }).join('');

    table.append(tableHeader);
    table.append(tableBody);
    app.append(table);
    return table;
}

const tableHeaderCreator = () => {
    const headerRow = createNode('tr');

    const avatarSpace = createNode('th');
    avatarSpace.innerText = '';

    const firstName = createNode('th');
    firstName.innerText = 'First Name';

    const lastName = createNode('th');
    lastName.innerText = 'Last Name';
    
    const email = createNode('th');
    email.innerText = 'Email';
    
    const title = createNode('th');
    title.innerText = 'Title';

    headerRow.append(avatarSpace);
    headerRow.append(firstName);
    headerRow.append(lastName);
    headerRow.append(email);
    headerRow.append(title);
    return headerRow;
}

const rowCreator = (user) => {
    const row = createNode('tr');

    const avatar = avatarCreator(user.avatar);
    const firstName = cellCreator(user.firstName);
    const lastName = cellCreator(user.lastName);
    const email = cellCreator(user.email);
    const title = cellCreator(user.title);

    row.append(avatar);
    row.append(firstName);
    row.append(lastName);
    row.append(email);
    row.append(title);
    return row;
}

const cellCreator = (attribute) => {
    const cell = createNode('td');
    cell.innerText = attribute;
    return cell;
}

const avatarCreator = (imgSrc) => {
    const cell = createNode('td');
    const img = createNode('img');
    img.src = imgSrc;
    cell.append(img);
    return cell;
}

const render = (users) => {
    console.log(users);
    pageHeader();
    tableCreator(users);

    const html = users.map( user => {
        return `
            <tr>
                <td>${user.email}</td>
            </tr>
        `;
    }).join('');
    console.log(html);
}
