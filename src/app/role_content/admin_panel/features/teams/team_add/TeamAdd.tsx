import { useState } from 'react';
import Modal from 'react-modal';
import { firestore } from '../../../../../../firebase';
import { Collections } from '../../../../../../enums/collection';
import Team from '../../../../../../models/Team';
import InputBox from '../../../shared_components/input_box/InputBox';
import './TeamAdd.scss';

type TeamAddProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TeamAdd: React.FC<TeamAddProps> = ({ setModalOpen }): JSX.Element => {
    const [team, setTeam] = useState<Team>(new Team({}));

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = `${e.target.name}` as const;
        const newTeam = new Team({ ...team });
        newTeam.handleTeam({ field: fieldName, value: e.target.value });
        setTeam(newTeam);
    };
    const submitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await firestore
            .collection(Collections.teams)
            .add(JSON.parse(JSON.stringify(team)))
            .then((doc) => {
                console.log(doc);
            })
            .catch((e) => {
                console.log(e);
            });
        setModalOpen(false);
    };

    return (
        <Modal
            className="teamAdd"
            isOpen={true}
            onRequestClose={() => setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="Overlay"
        >
            <form className="teamAddForm" onSubmit={submitForm}>
                <div className="teamAddForm__general">
                    <h1 className="teamAddForm__general--header">General</h1>
                    <div className="teamAddForm__general--input">
                        <InputBox title="Team Id" name="teamId" type="text" textHandler={handleForm} />
                        <InputBox title="Team Name" name="teamName" type="text" textHandler={handleForm} />
                        <InputBox title="Email Id" name="emailId" type="text" textHandler={handleForm} />
                    </div>
                </div>
                <div className="teamAddForm__matchData">
                    <h1 className="teamAddForm__matchData--header">Match Details</h1>
                    <div className="teamAddForm__matchData--input">
                        <InputBox title="Division" name="division" type="number" textHandler={handleForm} value={0} />
                        <InputBox
                            title="Matches Played"
                            name="numberOfMatches"
                            type="number"
                            textHandler={handleForm}
                            value={0}
                        />
                        <InputBox title="Won" name="won" type="number" textHandler={handleForm} value={0} />
                        <InputBox title="Lost" name="lost" type="number" textHandler={handleForm} value={0} />
                        <InputBox title="Draw" name="draw" type="number" textHandler={handleForm} value={0} />
                        <InputBox title="Tie" name="tie" type="number" textHandler={handleForm} value={0} />
                        <InputBox title="No Result" name="noResult" type="number" textHandler={handleForm} value={0} />
                        <InputBox
                            title="Total Points"
                            name="totalPoints"
                            type="number"
                            textHandler={handleForm}
                            value={0}
                        />
                        <InputBox
                            title="League Matches"
                            name="typeMatches_leagueMatch"
                            type="number"
                            textHandler={handleForm}
                            value={0}
                        />
                        <InputBox title="Walkover" name="walkover" type="number" textHandler={handleForm} value={0} />
                        <InputBox title="Conceed" name="conceed" type="number" textHandler={handleForm} value={0} />
                        <InputBox title="Refusal" name="refusal" type="number" textHandler={handleForm} value={0} />
                        <InputBox title="Penalty" name="penalty" type="number" textHandler={handleForm} value={0} />
                    </div>
                </div>
                <div className="teamAddForm__btn">
                    <button className="teamAddForm__btn--cancel" onClick={() => setModalOpen(false)}>
                        Cancel
                    </button>
                    <button className="teamAddForm__btn--submit" type="submit">
                        Save
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default TeamAdd;