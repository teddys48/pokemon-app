import { Children } from "react";

const Modal = ({ status, name, children, closeModal, data }) => {
  return (
    <>
      <div
        className={
          status
            ? "block z-50 items-center w-full h-full fixed bg-black bg-opacity-50"
            : "hidden"
        }
      >
        <div className="flex w-full h-full items-baseline justify-center py-32 px-5">
          <div className="flex space-y-5 flex-col w-full h-auto max-w-full border-2 px-2 rounded-md bg-white overflow-auto">
            <span className="flex w-full max-sm:text-2xl text-4xl font-bold">
              <span className="flex w-full justify-start">{name}</span>
              <span className="flex w-full justify-end">
                <button onClick={closeModal}>x</button>
              </span>
            </span>
            <div className="flex">
              {Children.map(children, (child) => child)}
            </div>
            <div className="flex w-full justify-end">
              <button
                onClick={closeModal}
                className="px-4 rounded-md py-2 text-white bg-pink-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Modal };
