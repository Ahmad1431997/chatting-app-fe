import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//Styling
import { Button, Modal, Form } from "react-bootstrap";
import { RiEdit2Fill } from "@react-icons/all-files/ri/RiEdit2Fill";

//Actions
import { updateProfile } from "../../store/actions/profileActions";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const profiles = useSelector((state) => state.profiles.profiles);

  const [show, setShow] = useState(false);

  const [_profile, setProfile] = useState({
    image: "",
    status: "",
    gender: "male",
  });

  const dispatch = useDispatch();

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
      {/*Remove inline styling */}
      <span style={{ color: "white" }}>
        <RiEdit2Fill color="black" size="2em" onClick={handleShow} />
      </span>
      {/*Remove break and add a margin instead */}
      <br />
      <h2>{user.username}</h2>
      <h3>{profile ? profile.gendar : ""}</h3>
      <h4>{profile ? profile.status : ""}</h4>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            {/*Remove inline styling */}
            <Modal.Title style={{ color: "black" }}>New Chat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              {/*Remove inline styling */}
              <Form.Label style={{ color: "black" }}>
                Select a receiver
              </Form.Label>

              <Form.Control
                name="gender"
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
                <Form.Control
                  name="status"
                  type="text"
                  onChange={handleChange}
                  placeholder="status"
                />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control onChange={handleImage} name="image" type="file" />
              </Form.Group>

              <Modal.Footer>
                <button className="btn secondary btn-primary" type="submit">
                  Update Profile
                </button>

                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default Profile;
