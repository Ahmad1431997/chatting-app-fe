import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";

//Styling
import { Button, Modal, Form, FormGroup } from "react-bootstrap"; //Remove unused import
import { BiCommentAdd } from "@react-icons/all-files/bi/BiCommentAdd";

//Components
import GroupItem from "./GroupItem";

//Actions
import { createRoom } from "../../store/actions/roomActions";

const GroupList = () => {
  const [show, setShow] = useState(false);
  const [room, setRoom] = useState({
    users: [],
    name: "",
    // image:"http://zslchrobry.lezajsk.pl/wp-content/uploads/2017/11/users.png" //Remove unused code
  });

  const _users = useSelector((state) => state.user.allUsers);
  const user = useSelector((state) => state.user.user);
  const otherUsers = _users.filter((_id) => _id.id !== user.id);

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createRoom(room));
    handleClose();
    setRoom({
      users: [],
      name: "",
    });
  };

  const rooms = useSelector((state) => state.rooms.rooms);

  const groupList = rooms
    .filter((room) => room.usersId.length > 2)
    .map((_room) => <GroupItem _room={_room} key={_room.id} />);

  const handleChange = (event) => {
    setRoom({
      ...room,
      users: [...room.users, event[event.length - 1].value],
    });

    console.log(room); //Remove console log
  };

  const handleInputChange = (event) => {
    setRoom({
      ...room,
      [event.target.name]: event.target.value,
    });

    console.log(room); //Remove console log
  };

  const TheListOfUsers = otherUsers.map((user) => {
    return { value: user.id, label: user.username };
  });

  return (
    <div className="groups">
      <div
        style={{
          position: "fixed",
          zIndex: 2,
          marginBottom: "7px",
          backgroundColor: "darkcyan",
        }} //Remove inline styling
      >
        {/*Remove inline styling */}
        <span style={{ color: "white" }}>
          <BiCommentAdd color="black" size="2em" onClick={handleShow} />
        </span>
        Your Groups
      </div>
      <br /> {/*Remove break and add a margin instead*/}
      {groupList}
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            {/*Remove inline styling */}
            <Modal.Title style={{ color: "black" }}>New Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              {/*Remove inline styling */}
              <Form.Label style={{ color: "black" }}>Select members</Form.Label>
              <Select
                isMulti
                name="users"
                options={TheListOfUsers}
                className="basic-multi-select optselect"
                classNamePrefix="select"
                onChange={handleChange}

                //  value={selectedOptions} //Remove unused code
              />
              <br /> {/*Remove break and add a margin instead*/}
              <Form.Group controlId="formBasicEmail">
                {/* <Form.Label style={{color:"black"}}>Group Name</Form.Label> */}
                <Form.Control
                  name="name"
                  type="text"
                  onChange={handleInputChange}
                  placeholder="group name"
                  required
                />
              </Form.Group>
              <Modal.Footer>
                {room.users.length > 1 ? (
                  <button className="btn secondary btn-primary" type="submit">
                    Create a group
                  </button>
                ) : (
                  <button
                    disabled
                    className="btn secondary btn-primary"
                    type="submit"
                  >
                    Create a group
                  </button>
                )}

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

export default GroupList;
