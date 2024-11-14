import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import coffeeData from './CoffeData';
import Navbar from './Navbar';

function App() {
  
  const loadCoffees = () => {
    const storedCoffees = localStorage.getItem('coffees');
    return storedCoffees ? JSON.parse(storedCoffees) : coffeeData;
  };

  
  const [coffees, setCoffees] = useState(loadCoffees);

  
  const [newCoffee, setNewCoffee] = useState({
    id: '',
    name: '',
    price: '',
    image_url: '',
    description: ''
  });

  
  useEffect(() => {
    localStorage.setItem('coffees', JSON.stringify(coffees));
  }, [coffees]);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCoffee({
      ...newCoffee,
      [name]: value
    });
  };

  
  const handleAddCoffee = (e) => {
    e.preventDefault();
    const coffee = { ...newCoffee, id: coffees.length + 1 };
    setCoffees([...coffees, coffee]);
    setNewCoffee({ id: '', name: '', price: '', image_url: '', description: '' });
  };

  
  const handleEditCoffee = (id) => {
    const coffeeToEdit = coffees.find((coffee) => coffee.id === id);
    setNewCoffee(coffeeToEdit);
  };

  
  const handleUpdateCoffee = (e) => {
    e.preventDefault();
    const updatedCoffees = coffees.map((coffee) =>
      coffee.id === newCoffee.id ? newCoffee : coffee
    );
    setCoffees(updatedCoffees);
    setNewCoffee({ id: '', name: '', price: '', image_url: '', description: '' });
  };

  
  const handleDeleteCoffee = (id) => {
    const filteredCoffees = coffees.filter((coffee) => coffee.id !== id);
    setCoffees(filteredCoffees);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          
          <Route 
            path="/" 
            element={
              <div>
                <h1>Welcome to the Coffee App!</h1>
                <img 
                  src="https://www.lavazza.com.au/en/coffee-secrets/popular-types-coffee-drinks-italy/_jcr_content/root/cust/customcontainer_copy/customcontainer_3676/image_809388429.coreimg.jpeg/1671709581874/d-m-type-of-coffee-drinks-small-04%402.jpeg"
                  alt="Coffee App" 
                  style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                />
              </div>
            } 
          />

          
          <Route
            path="/coffees"
            element={
              <div>
                <h1>Coffee Types</h1>
                <div className="coffee-container">
                  {coffees.map((coffee) => (
                    <div key={coffee.id} className="coffee-item">
                      <img src={coffee.image_url} alt={coffee.name} />
                      <h3>{coffee.name}</h3>
                      <p>Price: ${coffee.price}</p>
                      <p>{coffee.description}</p>
                      <button onClick={() => handleEditCoffee(coffee.id)}>Edit</button>
                      <button onClick={() => handleDeleteCoffee(coffee.id)}>Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            }
          />

          
          <Route
            path="/about"
            element={
              <div>
                <h1>Welcome to Irine's Coffee App. Be prepared to have your mind blown. Haha!</h1>
                <img 
                  src="https://esquirescoffee.co.uk/wp-content/uploads/2021/02/nathan-dumlao-vbt-Fp3b5FA-unsplash-scaled.jpg"
                  alt="About Irine's Coffee App"
                  style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                />
              </div>
            }
          />

          
          <Route
            path="/add-coffee"
            element={
              <div>
                <h2>{newCoffee.id ? 'Edit Coffee' : 'Add New Coffee'}</h2>
                <form onSubmit={newCoffee.id ? handleUpdateCoffee : handleAddCoffee}>
                  <input
                    type="text"
                    name="name"
                    value={newCoffee.name}
                    onChange={handleInputChange}
                    placeholder="Coffee Name"
                    required
                  />
                  <input
                    type="number"
                    name="price"
                    value={newCoffee.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                    required
                  />
                  <input
                    type="url"
                    name="image_url"
                    value={newCoffee.image_url}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                    required
                  />
                  <textarea
                    name="description"
                    value={newCoffee.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    required
                  />
                  <button type="submit">{newCoffee.id ? 'Update Coffee' : 'Add Coffee'}</button>
                </form>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
