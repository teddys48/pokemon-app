import { useEffect, useState } from "react";
import { Modal } from "../components/Modal";

const Home = () => {
  let [data, setData] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [pokemonData, setPokemonData] = useState([]);

  const openModal = () => {
    setModalStatus((val) => !val);
  };

  const closeModal = () => {
    setModalStatus((val) => !val);
  };

  const getData = async () => {
    await fetch("https://pokeapi.co/api/v2/pokemon/")
      .then((res) => {
        // if (data.length != 0) {
        res.json().then((a) => {
          setData(a);
        });
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPokemon = async (name) => {
    openModal();
    await fetch("https://pokeapi.co/api/v2/pokemon/" + name)
      .then((res) => {
        // if (data.length != 0) {
        res.json().then((a) => {
          setPokemonData(a);
        });
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
    loadMore();
  }, []);

  const loadMore = async (url) => {
    let x;
    // data.results.push({
    //   name: "pikachu",
    //   url: "https://pokeapi.co/api/v2/pokemon/20/",
    // });

    await fetch(url)
      .then((res) => {
        // if (data.length != 0) {
        res.json().then((b) => {
          setData((a) =>
            Object.assign({
              next: b.next,
              results: a.results.concat(b.results),
            })
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(data, pokemonData);

  return (
    <>
      <div className="flex w-full flex-col space-y-5">
        <div className="flex pt-5 space-y-1 max-sm:px-2 flex-row flex-wrap max-sm:justify-evenly justify-between w-full align-middle">
          {/* <div className="flex w-full flex-col space-x-1"> */}
          {data.length == 0
            ? ""
            : data?.results?.map((val) => {
                return (
                  <>
                    <button>
                      <div
                        onClick={() => getPokemon(val.name)}
                        className="flex flex-col w-40 justify-center items-center max-sm:w-32 max-sm:py-5 align-middle"
                        title={val.name}
                      >
                        <img
                          // className="w-32"
                          alt={val.name}
                          width="100px"
                          src={`https://img.pokemondb.net/artwork/${val.name}.jpg`}
                        ></img>
                      </div>
                    </button>
                  </>
                );
              })}
        </div>
        <div className="flex justify-center text-white space-y-4 pb-10">
          <button
            className="px-4 py-2 hover:bg-pink-600 bg-pink-500 rounded-md"
            onClick={() => loadMore(data.next)}
          >
            Load More...
          </button>
        </div>
        <div onClick={openModal}> open Modal</div>
        {/* </div> */}
      </div>
      <Modal
        status={modalStatus}
        name={pokemonData.name}
        closeModal={closeModal}
      >
        <div className="flex w-full">
          <div className="flex w-full justify-center items-center">
            <img
              className="max-sm:w-40 w-48"
              src={`https://img.pokemondb.net/artwork/${pokemonData.name}.jpg`}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export { Home };
