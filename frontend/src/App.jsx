import {Fragment, useState} from "react"; 
import Header from "./components/AddTask";
import TaskList from "./components/TaskList";

export default function App() {
  const [isFetched, setIsFetched] = useState(false);
  const fetchHandler = () => {
    setIsFetched(!isFetched);
  }

  return (
    <Fragment>
      <Header fetchHandler={fetchHandler}/>
      <TaskList isFetched={isFetched}/>
    </Fragment>
  );
}
