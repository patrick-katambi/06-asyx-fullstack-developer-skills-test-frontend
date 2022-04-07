import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTickets,
  getTicketFetchingStatus,
  getTicketListToDisplay,
  getTickets,
  getValue,
  setInitialNewTiketList,
  updateSearchResults,
} from "./view_ticket_slice";

import { useParams, useNavigate, useLocation } from "react-router-dom";

import "./view_ticket.css";

function View_ticket() {
  let navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();
  const tickets = useSelector(getTickets);
  const ticketsToDisplay = useSelector(getTicketListToDisplay);
  const status = useSelector(getTicketFetchingStatus);

  useEffect(() => {
    dispatch(fetchTickets());
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
        <>
          <div className="mx-5 p-4 flex flex-row items-center justify-between">
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
                onClick={() => navigate("/create")}
              >
                Create Ticket
              </button>
            </div>
          </div>
          <TicketTable tickets={ticketsToDisplay} />
        </>
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
    <div className="p-5">
      <table className="bg-[#F4F9F9] w-full rounded-lg border-collapse overflow-hidden">
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
  return (
    <tbody>
      {tickets.map((ticketRow, index) => {
        return (
          <tr
            key={index}
            className="table-row"
            onClick={() => {
              alert(ticketRow.id);
            }}
          >
            <TableRowData data={ticketRow.id} />
            <TableRowData data={ticketRow.caller.name} />
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
