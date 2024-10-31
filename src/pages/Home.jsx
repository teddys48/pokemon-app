import { useEffect, useState } from "react";
import { Modal } from "../components/Modal";

const Home = () => {
  let [data, setData] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonEvol, setPokemonEvol] = useState([]);

  const openModal = () => {
    setModalStatus((val) => !val);
  };

  const closeModal = () => {
    setModalStatus((val) => !val);
    setPokemonData([]);
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
    await fetch("https://pokeapi.co/api/v2/pokemon/" + name)
      .then((res) => {
        // if (data.length != 0) {
        res.json().then(async (a) => {
          console.log("pokemon data", a);
          await getSpecies(a.species.url);
          setPokemonData(a);
        });
        // }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("firstxxx", pokemonEvol);
    openModal();
  };

  const getSpecies = async (speciesLink) => {
    let evolutionName = [];
    await fetch(speciesLink)
      .then((res) => {
        // if (data.length != 0) {
        res.json().then(async (a) => {
          await getEvolutionChain(a.evolution_chain.url);
          console.log("pokemon species", a);
        });
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getEvolutionChain = async (link) => {
    await fetch(link)
      .then((res) => {
        // if (data.length != 0) {
        res.json().then((a) => {
          let x = [];
          x.push(a?.chain?.evolves_to[0]?.species?.name);
          let f = a?.chain.evolves_to[0]?.evolves_to;
          f.length == 0
            ? ""
            : x.push(a?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name);
          console.log("pokemon evolutionchain", a);
          console.log("firstqwqw", x);
          setPokemonEvol(x);
        });
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
    // loadMore();
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

  return (
    <>
      <div className="flex w-full flex-col space-y-5">
        <div className="flex pt-5 space-y-1 max-sm:px-2 flex-row flex-wrap  justify-center w-full align-middle">
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
            More...
          </button>
        </div>
        {/* </div> */}
      </div>
      <Modal
        status={modalStatus}
        name={
          pokemonData?.name?.charAt(0).toUpperCase() +
          pokemonData?.name?.substring(1)
        }
        closeModal={closeModal}
      >
        <div className="flex w-full h-full max-sm:flex-col flex-row space-y-5">
          <div className="flex flex-col max-sm:w-full w-full h-full justify-center items-start">
            <div className="flex w-full justify-center">
              <img
                className="max-sm:w-40 w-auto h-full"
                src={`https://img.pokemondb.net/artwork/${pokemonData?.name}.jpg`}
              />
            </div>
          </div>
          <div className="w-full flex flex-col space-y-3">
            <div className="flex w-full">
              <table className="table w-full [&>*]:w-full">
                <tbody>
                  <tr>
                    <td>Type</td>
                    <td>:</td>
                    <td>
                      {pokemonData?.types?.map((val) => {
                        return (
                          val?.type?.name?.charAt(0).toUpperCase() +
                          val?.type?.name?.substring(1) +
                          ", "
                        );
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td>Abilities</td>
                    <td>:</td>
                    <td>
                      {pokemonData?.abilities?.map((val) => {
                        return (
                          val?.ability?.name?.charAt(0).toUpperCase() +
                          val?.ability?.name?.substring(1) +
                          ", "
                        );
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex w-full flex-col">
              <span className="w-full flex">Evolution Chain</span>
              <div className="flex w-full flex-row">
                {pokemonEvol.map((val) => {
                  return (
                    <>
                      <div className="flex w-full flex-col">
                        <div className="flex w-full justify-center h-full">
                          <img
                            className="flex w-56 h-full"
                            src={`https://img.pokemondb.net/artwork/${val}.jpg`}
                          />
                        </div>

                        <span className="flex w-full justify-center">
                          {val}
                        </span>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          {/* <div className="flex w-full justify-center flex-col space-y-2"> */}
          {/* Types */}
          {/* <div className="flex w-full max-sm:flex-col">
              <span className="font-bold w-full flex justify-center text-xl">
                Type
              </span>
              <div className="bg-white w-full flex flex-row space-x-2 justify-center ">
                {pokemonData?.types?.map((data) => {
                  return (
                    <span className="flex flex-wrap">{data.type?.name}</span>
                  );
                })}
              </div>
            </div> */}
          {/* ABILITIES */}
          {/* <div className="flex w-full max-sm:flex-col">
              <span className="font-bold text-xl">Abilities</span>
              <div className="bg-white w-full flex flex-col overflow-auto max-h-32">
                {pokemonData?.abilities?.map((data) => {
                  return (
                    <span className="flex flex-wrap">{data.ability?.name}</span>
                  );
                })}
              </div>
            </div> */}
          {/* MOVES */}
          {/* <div className="flex w-full max-sm:flex-col">
              <span className="font-bold text-xl">Moves</span>
              <div className="bg-white w-full flex flex-col overflow-auto max-h-32">
                {pokemonData?.moves?.map((data) => {
                  return (
                    <span className="flex flex-wrap">
                      <a href={data.move.url} target={"_blank"}>
                        {" "}
                        {data.move.name}
                      </a>
                    </span>
                  );
                })}
              </div>
            </div> */}

          {/* <span className="flex flex-col">
              {pokemonData?.types?.map((data) => {
                return data.type.name;
              })}
              <span>Types</span>
            </span>
            <span className="text-2xl font-extralight">|</span> */}
          {/* <table className="table w-full">
              <tr className="flex justify-center space-x-5 font-semibold max-sm:text-lg text-2xl  max-sm:font-semibold  max-sm:space-x-2">
                <td className="flex flex-col">
                  <span>asasa</span>
                  <span>asasa</span>
                </td>
                <td className="flex flex-col">
                  <span>|</span>
                </td>
                <td>Normal</td>
                <td>|</td>
                <td>Normal</td>
              </tr>
              <tr className="flex justify-center space-x-5 font-semibold max-sm:text-lg text-2xl  max-sm:font-semibold  max-sm:space-x-2">
                <td>Type</td>
                <td>|</td>
                <td>Normal</td>
                <td>|</td>
                <td>Normal</td>
              </tr>
            </table> */}
          {/* </div> */}
        </div>
      </Modal>
    </>
  );
};

export { Home };
