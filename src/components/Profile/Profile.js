import { Button, Modal, Form, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { FiSettings } from "@react-icons/all-files/fi/FiSettings";
import {
  fetchProfiles,
  updateProfile,
} from "../../store/actions/profileActions";
import { fetchUsers, signout } from "../../store/actions/authActions";
import { useHistory } from "react-router";
import { HiOutlineLogout } from "@react-icons/all-files/hi/HiOutlineLogout";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(fetchProfiles());
    dispatch(fetchUsers());
  }, []);

  const user = useSelector((state) => state.user.user);
  console.log();
  const [show, setShow] = useState(false);
  const [_profile, setProfile] = useState({
    image:
      "https://i.pinimg.com/originals/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.png",
    status: "",
    gender: "male",
  });

  const profiles = useSelector((state) => state.profiles.profiles);
  const loadingprofile = useSelector((state) => state.profiles.loading);

  if (loadingprofile) return <Spinner />;
  const profile = profiles.find((profile) => profile.userId == user.id);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleImage = (event) => {
    setProfile({ ..._profile, image: event.target.files[0] });
  };
  const handleChange = (event) => {
    setProfile({ ..._profile, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(updateProfile(_profile, profile.id));
    handleClose();
    setProfile({
      image: "",
      status: "",
      gender: "",
    });
  };

  return (
    <div className="profile-cont">
      <span style={{ color: "white", marginRight: "40%" }}>
        <FiSettings color="black" size="2em" onClick={handleShow} />
        &nbsp; profile setting
      </span>

      <h2>{user.username}</h2>
      <img
        alt="profileImage"
        style={{ width: "80px", height: "80px", borderRadius: "50%" }}
        src={
          profile
            ?  profile.image || "https://i.pinimg.com/originals/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.png"
            :"https://i.pinimg.com/originals/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.png"
        }
      />

      <h5>{profile ? profile.gender : ""}</h5>
      <h5>{profile ? profile.status : ""}</h5>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header style={{ backgroundColor: "#353656" }} closeButton>
            <Modal.Title>Profile Setting</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              style={{
                backgroundColor: "#353656",
                margin: "auto",
                border: "solid 3px black",
              }}
              onSubmit={handleSubmit}
            >
              <Form.Label>gendar</Form.Label>

              <Form.Control
                name="gendar"
                as="select"
                className="mr-sm-2"
                id="inlineFormCustomSelect"
                onChange={handleChange}
                custom
                defaultValue="male"
              >
                <option value="male">male</option>
                <option value="female"> female</option>
              </Form.Control>
              <Form.Group controlId="formBasicEmail">
                <br />
                <Form.Label>status</Form.Label>
                <Form.Control
                  name="status"
                  type="text"
                  onChange={handleChange}
                  placeholder="status"
                />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <br />
                <Form.Label>your picture</Form.Label>
                <Form.Control onChange={handleImage} name="image" type="file" />
              </Form.Group>

              <Modal.Footer>
                <button className="btn secondary btn-primary" type="submit">
                  Apply
                </button>

                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
          <center>
            <button
              className="btn btn-danger"
              style={{ width: "80px" }}
              onClick={() => {
                dispatch(signout(history));
              }}
            >
              <HiOutlineLogout /> &nbsp; Logout{" "}
            </button>
          </center>
        </Modal>
      </>
    </div>
  );
};

export default Profile;
