import { FaChalkboardTeacher } from 'react-icons/fa';
import { GrUserWorker } from 'react-icons/gr';
import { MdAdminPanelSettings } from 'react-icons/md';

/*

add props to the function
*/

function DashboardCards() {
  return (
    <div>
      <div className="cardSection">
        <div className="card">
          <div className="cardInner">
            <h3>Teachers</h3>
            <FaChalkboardTeacher className="card-icon" />
          </div>
          <h1 className="cardcount">31</h1>
        </div>

        <div className="card">
          <div className="cardInner">
            <h3>Staff Members</h3>
            <GrUserWorker className="card-icon" />
          </div>
          <h1 className="cardcount">21</h1>
        </div>

        <div className="card">
          <div className="cardInner">
            <h3>Admin</h3>
            <MdAdminPanelSettings className="card-icon" />
          </div>
          <h1 className="cardcount">3</h1>
        </div>
      </div>
    </div>
  );
}

export default DashboardCards;
