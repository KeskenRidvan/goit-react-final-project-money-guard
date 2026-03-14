import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { signOut } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import Brand from "../Shared/Brand";
import Modal from "../Shared/Modal";

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(signOut()).unwrap();
      toast.success("Session closed.");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <header className="dashboard-header">
        <Brand to="/home" />
        <div className="dashboard-header__actions">
          <span className="dashboard-header__user">{user?.username ?? "Guest"}</span>
          <button className="button button--ghost" onClick={() => setIsLogoutOpen(true)} type="button">
            Exit
          </button>
        </div>
      </header>

      {isLogoutOpen ? (
        <Modal title="Log out" onClose={() => setIsLogoutOpen(false)} size="compact">
          <div className="confirm-dialog">
            <p>Do you really want to leave your private dashboard?</p>
            <div className="modal__actions">
              <button
                className="button button--modal-cancel"
                onClick={() => setIsLogoutOpen(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="button button--danger"
                onClick={handleLogout}
                type="button"
              >
                Log out
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}
