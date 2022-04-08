import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAcessToken, getUserId } from "../../app/globalStateSlice";
import { urls } from "../../core/urls";
import { getTicketData } from "./customize_ticket_slice";

import { v4 as uuidv4 } from "uuid";
import { findInArray } from "../../core/helper_functions";

function CustomizeTicket() {
  let navigate = useNavigate();
  const ticketData = useSelector(getTicketData);
  console.log(ticketData);

  const [ticketId, setTicketId] = useState("");

  const [caller, setCaller] = useState(null);

  const [short_desc, setShort_desc] = useState(null);

  const [description, setDescription] = useState(null);

  const created_by = useSelector(getUserId);

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
  const [selectedState, setSelectedState] = useState("");
  const [stateObject, setStateObject] = useState({});

  const accessToken = useSelector(getAcessToken);

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  useEffect(() => {
    setTicketId(uuidv4());

    Promise.all([
      axios.get(urls.groups, { headers: headers }),
      axios.get(urls.categories, { headers: headers }),
      axios.get(urls.impact, { headers: headers }),
      axios.get(urls.priorities, { headers: headers }),
      axios.get(urls.state, { headers: headers }),
    ]).then(function (results) {
      const groupsResponse = results[0].data.data;
      const categoriesResponse = results[1].data.data;
      const impactResponse = results[2].data.data;
      const prioritiesResponse = results[3].data.data;
      const stateResponse = results[4].data.data;

      setAssignment_group(groupsResponse);
      setCategory(categoriesResponse);
      setImpact(impactResponse);
      setPriority(prioritiesResponse);
      setState(stateResponse);
    });
  }, []);

  useEffect(() => {
    setTicketId(ticketData.id);
    setCaller(ticketData.caller);
    setShort_desc(ticketData.short_desc);
    setDescription(ticketData.description);
    setDue_date(ticketData.due_date);
    setSelectedAssignmentObject(ticketData.user_group);
    setAssignedUserObject(ticketData.assigned_to);
    setCategoryObject(ticketData.category);
    setImpactObject(ticketData.impact);
    setPriorityObject(ticketData.priority);
    setStateObject(ticketData.state);
  }, []);
  console.log({ ticketId });

  const handleChange = (event) => {
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

      case "state":
        const searchState = findInArray({
          array: state,
          searchItem: event.target.value,
        });
        setStateObject(searchState);
        setSelectedState(event.target.value);
        break;

      case "due-date":
        setDue_date(event.target.value);
        break;

      case "caller":
        setCaller(event.target.value);
        break;

      case "short_desc":
        setShort_desc(event.target.value);
        break;

      case "description":
        setDescription(event.target.value);
        break;

      default:
        break;
    }
  };

  const data = {
    id: ticketId,
    caller: caller,
    short_desc: short_desc,
    description: description,
    created_by: created_by,
    due_date: due_date,
    user_group: selectedAssignmentObject.id,
    assigned_to: assignedUserObject.id,
    category: categoryObject.id,
    impact: impactObject.id,
    priority: priorityObject.id,
    state: stateObject.id,
  };

  return (
    <div>
      <button onClick={() => navigate("/view")}>go back</button>
    </div>
  );
}

export default CustomizeTicket;
