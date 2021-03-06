import { useState, useEffect } from 'react';
import { Collections } from '../../../enums/collection';
import firebase from 'firebase';
import { firestore } from '../../../firebase';
import './TeamsPage.scss';
import LoadingComp from '../../shared_components/loading_comp/LoadingComp';
import Team from '../../../models/Team';
import TeamCard from './team_card/TeamCard';
import { usePagination } from 'use-pagination-firestore';
import PointsTable from './points_table/PointsTable';
import Footer from '../../shared_components/Footer/Footer';

const divisionTypes = [1, 2, 3, 4, 5];
const teamTypes = ['League Team', 'School Team', 'Knockout Team'];
const baseTeamQuery = firestore.collection(Collections.teams).orderBy('won', 'desc');
const kaveryLogo1 = `${process.env.PUBLIC_URL}/assets/images/kaveryHospital1.jpeg`;

const TeamsPage: React.FC<void> = (): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [query, setQuery] = useState<firebase.firestore.Query<firebase.firestore.DocumentData>>(baseTeamQuery);
    const { docs, isLoading, isStart, isEnd, getPrev, getNext } = usePagination<Team>(query, {
        limit: 10,
    });

    const [selectedTeamType, setSelectedTeamType] = useState<string | undefined>();
    const [selectedDivisionType, setSelectedDivisionType] = useState<number | undefined>();

    const switchSelectedTeamType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTeamType(e.target.value);
        setSelectedDivisionType(undefined);
    };
    const switchDivisionType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDivisionType(parseInt(e.target.value));
    };

    //  Callback to change the query based on the selected type.
    useEffect(() => {
        if (selectedTeamType == 'Select Type') {
            window.location.reload();
        }
        if (selectedTeamType) {
            let newQuery = baseTeamQuery.where('type', '==', selectedTeamType);
            if (selectedDivisionType) {
                newQuery = newQuery.where('division', '==', selectedDivisionType);
            }
            setQuery(newQuery);
        }
    }, [selectedTeamType, selectedDivisionType]);

    return (
        <div>
            {isLoading ? (
                <LoadingComp />
            ) : (
                <div className="teamsPage">
                    <div className="teamsPage__header">
                        <div className="teamsPage__header__header1">
                            <img src={kaveryLogo1} className="staffsPage__header__header1--img" />
                            <h1 className="teamsPage__header__header1--text">Teams Details</h1>
                        </div>
                        <div className="teamsPage__header__header2"></div>
                    </div>
                    <div className="teamsPage__teamSelect">
                        <select
                            className="teamsPage__teamTypeSelect--btn"
                            value={selectedTeamType}
                            onChange={switchSelectedTeamType}
                        >
                            <option selected>Select Type</option>
                            {teamTypes.map((teamType) => (
                                <option key={teamType} value={teamType}>
                                    {teamType}
                                </option>
                            ))}
                        </select>
                        {selectedTeamType == 'League Team' ? (
                            <div>
                                <select
                                    className="teamsPage__teamDivisionSelect--btn"
                                    value={selectedDivisionType}
                                    onChange={switchDivisionType}
                                >
                                    <option>Select Division</option>
                                    {divisionTypes.map((division) => (
                                        <option key={division} value={division}>
                                            Division {division}
                                        </option>
                                    ))}
                                </select>
                                <button className="teamsPage__pointsTable" onClick={() => setModalOpen(true)}>
                                    Points Table
                                </button>
                            </div>
                        ) : null}
                    </div>
                    <div className="teamsPage__teamCards">
                        {docs
                            .map((doc) => Team.fromFirestore(doc))
                            ?.map((teamDoc) => (
                                <TeamCard teamDoc={teamDoc} key={teamDoc.teamId ?? ''} />
                            ))}
                    </div>
                    <div className="teamsPage__pagination">
                        {isStart ? null : (
                            <button className="teamsPage__pagination--btn" onClick={() => getPrev()}>
                                Previous
                            </button>
                        )}
                        {isEnd ? null : (
                            <button className="teamsPage__pagination--btn" onClick={() => getNext()}>
                                Next
                            </button>
                        )}
                    </div>

                    {isModalOpen ? <PointsTable setModalOpen={setModalOpen} /> : null}
                    {/* <Footer /> */}
                </div>
            )}
        </div>
    );
};

export default TeamsPage;
