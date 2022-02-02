import './index.css'
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import AddItems from './AddItems';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';

function App() {

  const API_URL = 'http://localhost:3500/items';
  
  const [items, setitems] = useState([]);

  const [newItem, setnewItem] = useState('')
  const [search, setSearch] = useState('')
  const [fecthError, setFecthError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not received expected data')
        const listItems = await response.json();
        setitems(listItems);
        setFecthError(null);
      } catch (error) {
        setFecthError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);
  
  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = {id, checked: false, item};
    const listItems = [...items, myNewItem];
    //setAndSaveItems(listItems);
    setitems(listItems);
    
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFecthError(result);
  }


  const handleDelet = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    //setAndSaveItems(listItems);
    setitems(listItems);
    const deletOptions = {
      method: 'DELETE'
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deletOptions);
    if (result) setFecthError(result);
  }
  //handleCheck
  const handleClick4 = async (id) => {
    const listItems = items.map((item) => item.id == id? {...item,
    checked: !item.checked} : item);
    //setAndSaveItems(listItems);
    setitems(listItems);
    const myItem = listItems.filter(item => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked})
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFecthError(result);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setnewItem('');
  }
  return (
    <div >
      <Header title='Groceries'/>
      <AddItems
        newItem = {newItem}
        setnewItem = {setnewItem}
        handleSubmit = {handleSubmit}
      />
      <SearchItem
        search = {search}
        setSearch = {setSearch}
      />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fecthError && <p style={{ color: "red"}}>{`Error: ${fecthError}`}</p>}
        {!fecthError && !isLoading && <Content 
          items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleClick4 = {handleClick4}
          handleDelet = {handleDelet}
        />}
      </main>
      <Footer length = {items.length}/>
    </div>
  );
}

export default App;
