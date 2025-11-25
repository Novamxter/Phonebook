import React from "react";
import { deleteContact } from "../services/api.mjs";
import { TrashIcon as Remove } from "@heroicons/react/24/outline";

export default function RenderData({ contacts, onContactDeleted }) {
  const handleDelete = (id, name) => {
    deleteContact(id).then(() => {
      alert(`Contact ${name} is Deleted.`);
      onContactDeleted();
    });
  };

  return (
    <>
      {contacts.length !== 0 && (
        <div className="my-10 ">
          <h1 className="text-xl font-medium">Saved Contacts</h1>
          <table className="w-[80vw] mx-auto my-3">
            <thead>
              <tr>
                <th className="border border-gray-400 bg-gray-200 px-4 py-2">
                  Name
                </th>
                <th className="border border-gray-400 bg-gray-200 px-4 py-2">
                  Email
                </th>
                <th className="border border-gray-400 bg-gray-200 px-4 py-2">
                  Phone
                </th>
                <th className="border border-gray-400 bg-gray-200 px-4 py-2">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-gray-100">
                  <td className="border border-gray-400 px-4 py-2">
                    {contact.name}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {contact.email}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {contact.phone}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    <Remove
                      className="h-[22px] mx-auto"
                      onClick={() => handleDelete(contact._id, contact.name)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
