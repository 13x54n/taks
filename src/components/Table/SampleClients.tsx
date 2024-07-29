import { mdiEye, mdiTrashCan } from "@mdi/js";
import React, { useState } from "react";
import { useSampleClients } from "../../hooks/sampleData";
import { Client } from "../../interfaces";
import Button from "../Button";
import CardBoxModal from "../CardBox/Modal";
import Buttons from "../Buttons";
// import UserAvatar from "../UserAvatar";

const TableSampleClients = () => {
  const { clients } = useSampleClients();
  console.log(clients);

  const perPage = 5;

  const [currentPage, setCurrentPage] = useState(0);

  const clientsPaginated = clients.slice(
    perPage * currentPage,
    perPage * (currentPage + 1)
  );

  const numPages = Math.ceil(clients.length / perPage);

  const pagesList = [];

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i);
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false);
  const [isModalTrashActive, setIsModalTrashActive] = useState(false);

  const handleModalAction = () => {
    setIsModalInfoActive(false);
    setIsModalTrashActive(false);
  };

  return (
    <>
      <CardBoxModal
        title="Sample modal"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>

      <CardBoxModal
        title="Please confirm"
        buttonColor="danger"
        buttonLabel="Confirm"
        isActive={isModalTrashActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-200 dark:border-gray-700">
                Name
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-200 dark:border-gray-700">
                Company
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-200 dark:border-gray-700">
                City
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-200 dark:border-gray-700">
                Progress
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-200 dark:border-gray-700">
                Created
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-200 dark:border-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {clientsPaginated.map((client: Client) => (
              <tr
                key={client.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  {client.name}
                </td>
                <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  {client.company}
                </td>
                <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  {client.city}
                </td>
                <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <progress
                    className="w-full"
                    max="100"
                    value={client.progress}
                  >
                    {client.progress}
                  </progress>
                </td>
                <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <small className="text-gray-500 dark:text-gray-400">
                    {client.created}
                  </small>
                </td>
                <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <Buttons type="justify-start lg:justify-end" noWrap>
                    <Button
                      color="info"
                      icon={mdiEye}
                      onClick={() => setIsModalInfoActive(true)}
                      small
                    />
                    <Button
                      color="danger"
                      icon={mdiTrashCan}
                      onClick={() => setIsModalTrashActive(true)}
                      small
                    />
                  </Buttons>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <Buttons>
            {pagesList.map((page) => (
              <Button
                key={page}
                active={page === currentPage}
                label={page + 1}
                color={page === currentPage ? "lightDark" : "whiteDark"}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
          </Buttons>
          <small className="mt-4 md:mt-0">
            Page {currentPage + 1} of {numPages}
          </small>
        </div>
      </div>
    </>
  );
};

export default TableSampleClients;
