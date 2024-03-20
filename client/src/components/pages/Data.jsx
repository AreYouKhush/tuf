import axios from "axios";
import React, { useEffect, useState } from "react";
import url from "../../helpers/url";
import ClockLoader from "react-spinners/ClockLoader";

const Data = () => {
  const [dataset, setDataSet] = useState([]);
  let [loading, setLoading] = useState(true);
  const tableHeaders = {
    id: "ID",
    username: "Username",
    language: "Language",
    source: "Source Code",
    stdin: "Stdin",
    createdAt: "Submitted On",
  };
  const getData = async () => {
    const { data } = await axios.get(url + "user/data");
    let dataArr = data.response;
    dataArr = dataArr.map((d) => ({
      ...d,
      createdAt: d.createdAt.substring(0, 10),
    }));
    setDataSet([...dataArr]);
  };

  useEffect(() => {
    getData();
    setLoading(false);
  }, []);
  return (
    <>
      <div className="bg-gray-200 w-11/12 p-5 min-h-dvh">
        <div
          className="grid border-[1px] border-solid border-black p-1 rounded-lg gap-1 bg-gray-600 md:overflow-hidden overflow-x-scroll"
          style={{ gridTemplateColumns: `40px 1fr 0.5fr 1fr 3fr 0.6fr` }}
        >
          {/* <div key="key" className="grid grid-cols-6  font-amaranth font-bold lg:text-lg text-base gap-2 place-items-center"> */}
          <div className="font-amaranth font-bold lg:text-lg text-base text-center bg-gray-300 py-1 rounded-lg px-2">
            {tableHeaders.id}
          </div>
          <div className="font-amaranth font-bold lg:text-lg text-base text-center bg-gray-300 py-1 rounded-lg px-2">
            {tableHeaders.username}
          </div>
          <div className="font-amaranth font-bold lg:text-lg text-base text-center bg-gray-300 py-1 rounded-lg px-2">
            {tableHeaders.language}
          </div>
          <div className="font-amaranth font-bold lg:text-lg text-base text-center bg-gray-300 py-1 rounded-lg px-2">
            {tableHeaders.stdin}
          </div>
          <div className="font-amaranth font-bold lg:text-lg text-base text-center min-w-52 bg-gray-300 py-1 rounded-lg px-2">
            {tableHeaders.source}
          </div>
          <div className="font-amaranth font-bold lg:text-lg text-base text-center bg-gray-300 py-1 rounded-lg px-2">
            {tableHeaders.createdAt}
          </div>
          {/* </div> */}
          {dataset.map((d, key) => {
            return (
              <React.Fragment key={key}>
                {/* <div key="key" className="grid grid-cols-6 border-solid border-[1px] border-t-black p-2 gap-2 lg:text-base text-sm"> */}
                <div className="lg:text-base text-sm bg-gray-200 rounded-lg p-2 text-center font-semibold">
                  {d.id}
                </div>
                <div className="lg:text-base text-sm bg-gray-200 rounded-lg p-2">
                  {d.username}
                </div>
                <div className="lg:text-base text-sm bg-gray-200 rounded-lg p-2 text-center">
                  {d.language}
                </div>
                <div className="lg:text-base text-sm bg-gray-200 rounded-lg p-2">
                  {d.stdin}
                </div>
                <div className="flex">
                  <textarea
                    disabled
                    readOnly
                    className="resize-none overflow-hidden bg-gray-300 rounded-lg p-2 hover:shadow-lg cursor-pointer hover:opacity-85 duration-150 w-full"
                    value={d.source}
                    rows={
                      d.source.split("\n").length < 10
                        ? d.source.split("\n").length
                        : 7
                    }
                  ></textarea>
                </div>
                <div className="lg:text-base text-sm bg-gray-200 rounded-lg p-2 text-center">
                  {d.createdAt}
                </div>
                {/* </div> */}
              </React.Fragment>
            );
          })}
        </div>
        <div className="flex justify-center p-6">
          <ClockLoader
            color={'#000'}
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    </>
  );
};

export default Data;
