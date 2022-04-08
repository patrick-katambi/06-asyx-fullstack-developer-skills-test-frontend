import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTickets,
  getTicketFetchingStatus,
  getTicketListToDisplay,
  getTickets,
  getValue,
  populateTickets,
  setInitialNewTiketList,
  updateSearchResults,
} from "./view_ticket_slice";

import { useParams, useNavigate, useLocation, Link } from "react-router-dom";

import "./view_ticket.css";
import { getAcessToken, getUserId } from "../../app/globalStateSlice";
import { urls } from "../../core/urls";
import { getRequest } from "../../core/helper_functions";
import axios from "axios";
import { insertTicketRow } from "../customize_ticket/customize_ticket_slice";

function View_ticket() {
  let navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();
  const tickets = useSelector(getTickets);
  const ticketsToDisplay = useSelector(getTicketListToDisplay);
  const status = useSelector(getTicketFetchingStatus);

  const accessToken = useSelector(getAcessToken);
  const user_id = useSelector(getUserId);

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  useEffect(() => {
    console.log({ accessToken, user_id });
    axios.get(urls.ticket.getAll, { headers: headers }).then((response) => {
      dispatch(populateTickets(response.data));
    });
  }, []);

  const inputOnChange = (event) => {
    setInputValue(event.target.value);
    var newTicketList = tickets.filter((ticket) =>
      ticket.id.includes(event.target.value)
    );
    dispatch(updateSearchResults(newTicketList));
  };

  return (
    <div>
      {status !== "idle" ? (
        <FetchingTicketsLoading />
      ) : (
        <div className="w-screen px-[10vw] relative">
          <p className="font-light text-[80px] text-center py-5">
            Ticket Viewing
          </p>
          <p
            onClick={() => {
              axios
                .get(`${urls.user.logout}/${user_id}`, { headers: headers })
                .then((response) => {
                  console.log(response);
                  if (response.data.message === "SUCCESS") navigate("/");
                });
            }}
            className="absolute top-[80px] right-[10vw] text-[grey] font-bold cursor-pointer opacity-80 "
          >
            Logout
          </p>
          <div className="py-4 flex flex-row items-center justify-between">
            <input
              type="text"
              value={inputValue}
              onChange={inputOnChange}
              placeholder="Search id .."
              className="bg-[whitesmoke] px-5 py-5 font-bold rounded-lg border-none outline-none"
            />
            <div className="">
              <button
                className="h-full bg-[#D8AC9C] px-6 py-5 font-bold rounded-lg"
                onClick={() => {
                  console.log("navigating ...");
                  navigate("/create");
                }}
              >
                Create Ticket
              </button>
            </div>
          </div>
          <TicketTable tickets={ticketsToDisplay} />
        </div>
      )}
    </div>
  );
}

export default View_ticket;

function FetchingTicketsLoading() {
  return (
    <div className="w-full h-screen bg-[whitesmoke] flex items-center justify-center">
      <p>Loading ...</p>
    </div>
  );
}

function TableHeadTitle({ title }) {
  return <th className="pl-5 py-5">{title}</th>;
}

function TableRowData({ data }) {
  return <td className="text-base font-normal pl-5 py-5">{data ?? "null"}</td>;
}

function TicketTable({ tickets }) {
  return (
    <div className="mt-[20px]">
      <table className="bg-[#F4F9F9] w-full rounded-lg border-collapse overflow-hidden shadow-lg">
        <TableHead />
        <TableBody tickets={tickets} />
      </table>
    </div>
  );
}

function TableHead() {
  const titles = [
    "ID",
    "CALLER",
    "SHORT DESC",
    "DUE DATE",
    "CATEGORY",
    "PRIORITY",
    "STATE",
  ];
  return (
    <thead className="bg-[#C2B092] text-left shadow-emerald-900">
      <tr>
        {titles.map((title, index) => {
          return (
            <TableHeadTitle key={index} identifier={index} title={title} />
          );
        })}
        {/* <TableHeadTitle title={"ID"} />
        <TableHeadTitle title={"CALLER"} />
        <TableHeadTitle title={"SHORT DESC"} />
        <TableHeadTitle title={"DUE DATE"} />
        <TableHeadTitle title={"CATEGORY"} />
        <TableHeadTitle title={"PRIORITY"} /> */}
      </tr>
    </thead>
  );
}

function TableBody({ tickets }) {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <tbody>
      {tickets.map((ticketRow, index) => {
        return (
          <tr
            key={index}
            className="table-row"
            onClick={() => {
              dispatch(insertTicketRow(ticketRow))
              navigate('/customize')
            }}
          >
            <TableRowData data={ticketRow.id} />
            <TableRowData data={ticketRow.caller} />
            <TableRowData data={ticketRow.short_desc} />
            <TableRowData data={ticketRow.due_date} />
            <TableRowData data={ticketRow.category.name} />
            <TableRowData data={ticketRow.priority.name} />
            <TableRowData data={ticketRow.state.name} />
          </tr>
        );
      })}
    </tbody>
  );
}
