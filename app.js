const app = document.querySelector('#app');
const searchAPI = 'https://acme-users-api-rev.herokuapp.com/api';

/*
window.addEventListener('hashchange', () => {
    loadData();
})
*/

const createNode = (type) => document.createElement(type);

// goals: 
// 0. capture string input (workshop from J)
// 1. create a hash from the input
// 2. use that hash to update URL
// 3. use clear to set default


const createPageHeader = () => {
    const pageName = createNode('h1');
    pageName.innerText = 'Acme User Search';
    app.append(pageName);
    return pageName;
}

const createSearchBar = () => {
    const form = createNode('form');
    const search = createNode('input');
    const clearContainer = createNode('div');
    const clear = createNode('a');
    let inputStr = '';

    search.setAttribute('placeholder','input search term');



    form.addEventListener('input', ev=> {
        ev.preventDefault();
        console.log(ev.target.value);
        inputStr = ev.target.value;

        if(ev.keyCode === 13) {
            ev.preventDefault();
            loadData(inputStr);
        }
    })

    /*
    inputStr = search.addEventListener('input', ev => {
        setTimeout(resolve => {

        })
        loadData(ev.target.value);
    
    })
    //loadData(inputStr);
    */
    /*
   search.addEventListener('input', event => {
        //console.log(event.target.value);
        //event.preventDefault();
        inputStr = event.target.value;
        console.log(inputStr);

        if (event.keyCode === 13) { //checks if pressed key is enter
            event.preventDefault();
            console.log('target', inputStr)
            //loadData(inputStr);
            

            fetch(`${searchAPI}/users/search/${inputStr}`)
            .then(response => {
                return response.json()
            })
            .then( data => {
                console.log(data);
                render(data.users);
            })

        }

   })
   */


    /*
    search.addEventListener('input', event => {
        //console.log(event.target.value);
        event.preventDefault();
        inputStr = event.target.value;
        console.log(inputStr);
        
        
        /*
        search.addEventListener('change', enterEv => {
            enterEv.preventDefault();
            //loadData(inputStr);
            fetch(`${searchAPI}/users/search/${inputStr}`)
       .then(response => {
           return response.json()
       })
       .then( data => {
           console.log(data);
           render(data.users);
       })

        })
        */
        /*
       
        if (event.keyCode === 13) { //checks if pressed key is enter
            
            console.log('target', inputStr)
            //loadData(inputStr);
            //event.preventDefault();

            fetch(`${searchAPI}/users/search/${inputStr}`)
            .then(response => {
                return response.json()
            })
            .then( data => {
                console.log(data);
                render(data.users);
            })

        }
        
    })
    */
    
    // upon hitting enter, convert input str

    clear.innerText = 'Clear';
    //clear.setAttribute('href', 'https://acme-users-api-rev.herokuapp.com/api/users/search/0')
    clear.addEventListener('click', event => {
        loadData();
    })

    clearContainer.append(clear);
    form.append(search);
    form.append(clearContainer);
    app.append(form);
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
    app.innerHTML = '';
    createPageHeader();
    createSearchBar();
    tableCreator(users);
}

const loadData = (inputStr) => {
    //const hash = window.location.hash || 'Glo';
    //let endPoint = '';
    console.log(inputStr);
    if (inputStr === undefined) inputStr = '0';
    //console.log(inputStr);
    //endPoint = 'Glo';
    //inputStr = 'isi';
    /*
    const hash = window.location.hash || '0';
    console.log(window.location);
    console.log(hash, hash.length);
    */
    fetch(`${searchAPI}/users/search/${inputStr}`)
    .then(response => {
        return response.json()
    })
    .then( data => {
        console.log(data);
        render(data.users);
    })
}

loadData();