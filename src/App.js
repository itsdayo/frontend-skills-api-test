import "./style.css";
import FoodList from "./components/FoodList";
import FoodForm from "./components/FoodForm";
function App() {
  return (
    <div>
      <div className="food-list">
        <div className="food-list-content">
          <FoodList />
        </div>
      </div>
      {/* <div className="food-form">
        <div className="food-form-content">
          <FoodForm />
        </div>
      </div> */}
    </div>
  );
}

export default App;
