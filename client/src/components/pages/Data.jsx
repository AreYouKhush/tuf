import axios from "axios";
import React, { useEffect, useState } from "react";
import url from "../../helpers/url";
import ScaleLoader from "react-spinners/ScaleLoader";
import ExpandIcon from "../../assets/expand.png";

const Data = () => {
  const [dataset, setDataSet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginate, setPaginate] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const tableHeaders = {
    id: "ID",
    username: "Username",
    language: "Language",
    source: "Source Code",
    stdin: "Stdin",
    stdout: "Stdout",
    createdAt: "Submitted On",
  };

  const getData = async () => {
    const { data } = await axios.get(url + "user/data");
    let dataArr = data.response;
    let snum = 0;
    dataArr.reverse();
    dataArr = dataArr.map((d) => ({
      ...d,
      snum: ++snum,
      createdAt: d.createdAt.substring(0, 10),
      rows: d.source.split("\n").length < 10 ? d.source.split("\n").length : 7,
      expaded: false,
    }));
    let paginatedArr = [];
    let fragment = [];
    let count = 1;
    let len = 0;

    dataArr.forEach((d) => {
      if (len < 10) {
        fragment.push(d);
        len++;
      } else {
        paginatedArr.push({ id: count, fragment: fragment });
        fragment = [];
        fragment.push(d);
        len = 1;
        count++;
      }
    });

    if (len <= 10) {
      paginatedArr.push({ id: count, fragment: fragment });
    }

    setDataSet([...paginatedArr[0].fragment]);
    setPaginate([...paginatedArr]);
    setLoading(false);
  };

  const nextPage = () => {
    if (currentPage != paginate.length - 1) {
      setCurrentPage((prev) => prev + 1);
      setDataSet([...paginate[currentPage + 1].fragment]);
    }
  };

  const prevPage = () => {
    if (currentPage != 0) {
      setCurrentPage((prev) => prev - 1);
      setDataSet([...paginate[currentPage - 1].fragment]);
    }
  };

  const expand = (id) => {
    const newData = dataset.map((d) => {
      return {
        ...d,
        rows: !d.expaded
          ? d.id === id
            ? d.source.split("\n").length
            : d.rows
          : d.source.split("\n").length < 10
          ? d.source.split("\n").length
          : 7,
        expaded: d.id === id ? !d.expaded : d.expaded,
      };
    });
    setDataSet([...newData]);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="bg-gray-200 w-11/12 p-2 md:p-5 min-h-dvh relative">
        <div
          className="grid border-[1px] border-solid border-black p-1 rounded-lg gap-1 bg-gray-600 md:overflow-hidden overflow-x-scroll"
          style={{ gridTemplateColumns: `40px 1fr 0.5fr 1fr 3fr 1fr 0.6fr` }}
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
            {tableHeaders.stdout}
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
                  {d.snum}
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
                <div className="flex relative group">
                  <textarea
                    disabled
                    readOnly
                    className="resize-none overflow-hidden bg-gray-300 rounded-lg p-2 hover:shadow-lg cursor-pointer hover:opacity-85 duration-150 w-full"
                    value={d.source}
                    rows={d.rows}
                  ></textarea>
                  <div
                    onClick={() => {
                      expand(d.id);
                    }}
                    className="absolute h-5 right-2 top-2 hidden group-hover:flex opacity-75 cursor-pointer hover:bg-orange-600 rounded-lg"
                  >
                    <img src={ExpandIcon} className="h-5" alt="" />
                  </div>
                </div>
                <div className="lg:text-base text-sm bg-gray-200 rounded-lg p-2">
                  {d.stdout}
                </div>
                <div className="lg:text-base text-sm bg-gray-200 rounded-lg p-2 text-center">
                  {d.createdAt}
                </div>
                {/* </div> */}
              </React.Fragment>
            );
          })}
        </div>
        <div className={loading ? "flex justify-center p-6" : ""}>
          <ScaleLoader
            color={"#000"}
            loading={loading}
            height={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        <div className="flex gap-2 justify-center items-center p-3 font-amaranth">
          <div
            onClick={prevPage}
            className="bg-orange-700 px-2 py-1 font-semibold text-white rounded-lg cursor-pointer"
          >
            Prev
          </div>
          {paginate.map((p, key) => {
            return (
              <div
                key={key}
                onClick={() => {
                  setCurrentPage(p.id - 1);
                  setDataSet([...paginate[p.id - 1].fragment]);
                }}
                className={
                  currentPage + 1 === p.id
                    ? "bg-gray-500 px-2 py-1 text-white rounded-lg cursor-pointer"
                    : "cursor-pointer"
                }
              >
                {p.id}
              </div>
            );
          })}
          <div
            onClick={nextPage}
            className="bg-orange-700 px-2 py-1 font-semibold text-white rounded-lg cursor-pointer"
          >
            Next
          </div>
        </div>
      </div>
    </>
  );
};

export default Data;
