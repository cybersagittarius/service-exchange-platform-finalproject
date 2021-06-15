import React, {useContext} from "react";
import SkillsMenuSmall from "./SkillsMenuSmall";
import SearchContext from "../context/SearchContext";
import onClickOutside from "react-onclickoutside";
import { Link } from "react-router-dom";

function FindMenuSmall({  
  items,
  lookSelection,
  handleLookSelection,
  CountryDropdown,
  country,
  selectCountry,
  RegionDropdown,
  region,
  selectRegion,
  setShowSkillsSelection,
  showSkillsSelection,
  goSearch,  
}) {
  const context = useContext(SearchContext);
  const {show, setShow, goRegister, goLogin} = context


  const showHide = () => {
    if (show === "none") {
      setShow("block");
    } else {
      setShow("none");
    }
  };

  FindMenuSmall.handleClickOutside = () => setShow("none");

  return (
    <>
      <div className="form smallFindMenu">
        <button onClick={showHide} className="burger">
          <i class="fas fa-bars fa-2x"></i>
        </button>

        <div style={{ display: show }}>
          <div className="DDFindMenu">
            <div className="skillsMenus">
              <div className="btn-group LogRegSmall" role="group">
                <button>EN</button>
                <button>DE</button>
              </div>

                <button onClick={goLogin} className="btn log">
                  Login
                </button>

                <button onClick={goRegister} className="btn log">
                  Register
                </button>
              <br />
              <SkillsMenuSmall
                title="I'm Looking For"
                items={items}
                multiSelect
                selection={lookSelection}
                handleSelection={handleLookSelection}
                showSkillsSelection={showSkillsSelection}
                setShowSkillsSelection={setShowSkillsSelection}
              />
              <CountryDropdown
                value={country}
                onChange={(e) => selectCountry(e)}
              />

              <RegionDropdown
                country={country}
                value={region}
                onChange={(e) => selectRegion(e)}
              />
            </div>

            <div className="btnFindDiv">
              <button
                onClick={goSearch}
                type="button"
                value="search"
                className="btnFind"
              >
                Find
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => FindMenuSmall.handleClickOutside,
};

export default onClickOutside(FindMenuSmall, clickOutsideConfig);
