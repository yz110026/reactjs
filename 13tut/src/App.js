import './index.css'
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import AddItems from './AddItems';
import SearchItem from './SearchItem';
function App() {

  const API_URL = 'http://localhost:3500/items';
  // const [items, setitems] = useState(
  //   JSON.parse(localStorage.getItem('shoppinglist'))
  // ); 
  const [items, setitems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []); 

  const [newItem, setnewItem] = useState('')
  const [search, setSearch] = useState('')
//items is as a dependece, when items change it call once the log
  // useEffect(() => {
  //  console.log("updating items state")
  // }, [items]);
  useEffect(() => {
    localStorage.setItem('shoppinglist', JSON.stringify(newItem));
  }, [items]);
  // this fuction is equal to setAndSaveItems()

  // const setAndSaveItems = (newItems) => {
  //   setitems(newItems);
  //   localStorage.setItem('shoppinglist', JSON.stringify(newItems));
  // }
  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = {id, checked: false, item};
    const listItems = [...items, myNewItem];
    //setAndSaveItems(listItems);
    setitems(listItems)
    
  }


  const handleDelet = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    //setAndSaveItems(listItems);
    setitems(listItems)

  }
  const handleClick4 = (id) => {
    const listItems = items.map((item) => item.id == id? {...item,
    checked: !item.checked} : item);
    //setAndSaveItems(listItems);
    setitems(listItems)
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
      <Content 
        items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleClick4 = {handleClick4}
        handleDelet = {handleDelet}
        />
      <Footer length = {items.length}/>
    </div>
  );
}

export default App;
