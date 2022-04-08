import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAcessToken } from "../../app/globalStateSlice";
import { urls } from "../../core/urls";

function CreateTicket() {
  const [ticketId, setTicketId] = useState(null);
  const [caller, setCaller] = useState(null);
  const [short_desc, setShort_desc] = useState(null);
  const [description, setDescription] = useState(null);
  const [created_by, setCreated_by] = useState(null);
  const [due_date, setDue_date] = useState(null);

  const [assignment_group, setAssignment_group] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState("");
  const [selectedAssignmentObject, setSelectedAssignmentObject] = useState({});

  const [assigned_to, setAssigned_to] = useState(null);
  const [usersByGroupId, setUsersByGroupId] = useState(null);
  const [assignedUserObject, setAssignedUserObject] = useState({});

  const [category, setCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryObject, setCategoryObject] = useState({});

  const [impact, setImpact] = useState(null);
  const [selectedImpact, setSelectedImpact] = useState("");
  const [impactObject, setImpactObject] = useState({});

  const [priority, setPriority] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [priorityObject, setPriorityObject] = useState({});

  const [state, setState] = useState(null);

  const accessToken = useSelector(getAcessToken);

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  useEffect(() => {
    Promise.all([
      axios.get(urls.groups, { headers: headers }),
      axios.get(urls.categories, { headers: headers }),
      axios.get(urls.impact, { headers: headers }),
      axios.get(urls.priorities, { headers: headers }),
    ]).then(function (results) {
      const groupsResponse = results[0].data.data;
      const categoriesResponse = results[1].data.data;
      const impactResponse = results[2].data.data;
      const prioritiesResponse = results[3].data.data;

      setAssignment_group(groupsResponse);
      setCategory(categoriesResponse);
      setImpact(impactResponse);
      setPriority(prioritiesResponse);
    });
  }, []);

  const handleSelectChange = (event) => {
    switch (event.target.name) {
      case "assignment groups":
        setAssigned_to(null);

        const searchAssignment = findInArray({
          array: assignment_group,
          searchItem: event.target.value,
        });
        setSelectedAssignmentObject(searchAssignment);

        axios
          .get(`${urls.groups}/${searchAssignment.id}`, { headers: headers })
          .then((response) => {
            const usersByAssignmentGroup = response.data.data;
            setUsersByGroupId(usersByAssignmentGroup);
          });

        setSelectedAssignment(event.target.value);
        break;

      case "categories":
        const searchCategory = findInArray({
          array: category,
          searchItem: event.target.value,
        });
        setCategoryObject(searchCategory);
        setSelectedCategory(event.target.value);
        break;

      case "users":
        const searchUsers = findInArray({
          array: usersByGroupId,
          searchItem: event.target.value,
        });
        setAssignedUserObject(searchUsers);
        setAssigned_to(event.target.value);
        break;

      case "impact":
        const searchImpact = findInArray({
          array: impact,
          searchItem: event.target.value,
        });
        setImpactObject(searchImpact);
        setSelectedImpact(event.target.value);
        break;

      case "priority":
        const searchPriority = findInArray({
          array: priority,
          searchItem: event.target.value,
        });
        setPriorityObject(searchPriority);
        setSelectedPriority(event.target.value);
        break;

      default:
        break;
    }
  };

  console.log({ selectedAssignmentObject });
  console.log({ categoryObject });
  console.log({ assignedUserObject });
  console.log({ impactObject });
  console.log({ priorityObject });

  return (
    <div className="h-screen w-screen bg-[whitesmoke] px-[10vw] py-[40px] flex flex-col ">
      <p className="font-light mb-10 text-[80px] text-center ">Create Ticket</p>

      <p>{selectedPriority}</p>

      <SelectionGroup
        label="Assignment group"
        name="assignment groups"
        value={selectedAssignment}
        onChange={handleSelectChange}
        data_source={assignment_group}
      />

      <br />

      {usersByGroupId == null ? (
        ""
      ) : (
        <>
          <SelectionGroup
            label="Users"
            name="users"
            value={assigned_to}
            onChange={handleSelectChange}
            data_source={usersByGroupId}
          />
          <br />
        </>
      )}

      <SelectionGroup
        label="Category"
        name="categories"
        value={selectedCategory}
        onChange={handleSelectChange}
        data_source={category}
      />

      <br />

      <SelectionGroup
        label="Impact level"
        name="impact"
        value={selectedImpact}
        onChange={handleSelectChange}
        data_source={impact}
      />

      <br />

      <SelectionGroup
        label="Priority"
        name="priority"
        value={selectedPriority}
        onChange={handleSelectChange}
        data_source={priority}
      />
    </div>
  );
}

export default CreateTicket;

function SelectionGroup(props) {
  return (
    <div className="flex flex-row items-center justify-between w-[100%] ">
      <p className="mr-5 w-[40%] ">{props.label}</p>
      <select
        name={props.name}
        value={props.value || ""}
        onChange={props.onChange}
        className="w-[100%]"
      >
        <option value="" disabled>
          Select your option
        </option>
        {props.data_source !== null
          ? props.data_source.map((item) => {
              return <option key={item.id}>{item.name}</option>;
            })
          : ""}
      </select>
    </div>
  );
}

function findInArray(props) {
  const searchResult = props.array.filter(
    (item) => item.name === props.searchItem
  );
  return searchResult[0];
}