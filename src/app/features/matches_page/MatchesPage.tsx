import { useState, useEffect } from 'react';
import { Collections } from '../../../enums/collection';
import firebase from 'firebase';
import { firestore } from '../../../firebase';
import Match from '../../../models/Match';
import './MatchesPage.scss';
import LoadingComp from '../../shared_components/loading_comp/LoadingComp';
import { usePagination } from 'use-pagination-firestore';
import MatchCard from './match_card/MatchCard';

const divisionTypes = [1, 2, 3, 4, 5];
const matchTypes = ['LeagueTournament', 'SchoolTournament', 'KnockoutTournament'];
const schoolMatchTypes = ['Below 8th Std', 'Below 10th Std', 'Below 12th Std'];
const kaveryLogo1 = `${process.env.PUBLIC_URL}/assets/images/kaveryHospital1.jpeg`;
const baseMatchQuery = firestore.collection(Collections.matches).orderBy('date', 'desc');

const MatchesPage: React.FC<void> = (): JSX.Element => {
    const [query, setQuery] = useState<firebase.firestore.Query<firebase.firestore.DocumentData>>(baseMatchQuery);
    const { docs, isLoading, isStart, isEnd, getPrev, getNext } = usePagination<Match>(query, {
        limit: 10,
    });
    const [matchType, setMatchType] = useState<string>();

    const [selectedMatchType, setSelectedMatchType] = useState<string | undefined>();
    const [selectedDivisionType, setSelectedDivisionType] = useState<number | undefined>();
    const [selectedSchoolMatchType, setSelectedSchoolMatchType] = useState<string | undefined>();

    const switchDivisionType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDivisionType(parseInt(e.target.value));
    };
    const switchMatchType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value == 'LeagueTournament') setMatchType('League Tournament');
        if (e.target.value == 'SchoolTournament') setMatchType('School Tournament');
        if (e.target.value == 'KnockoutTournament') setMatchType('Knockout Tournament');
        setSelectedMatchType(e.target.value);
        setSelectedDivisionType(undefined);
        setSelectedSchoolMatchType(undefined);
    };
    const switchSchoolMatchType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSchoolMatchType(e.target.value);
    };
    //  Callback to change the query based on the selected type.
    useEffect(() => {
        if (selectedMatchType == 'Select Type') {
            window.location.reload();
        }
        if (selectedMatchType) {
            if (selectedMatchType == 'LeagueTournament') setMatchType('League Tournament');
            if (selectedMatchType == 'SchoolTournament') setMatchType('School Tournament');
            if (selectedMatchType == 'KnockoutTournament') setMatchType('Knockout Tournament');
            let newQuery = baseMatchQuery.where('type', '==', matchType);
            if (selectedDivisionType) {
                newQuery = newQuery.where('division', '==', selectedDivisionType);
            }
            if (selectedSchoolMatchType) {
                newQuery = newQuery.where('schoolMatchType', '==', selectedSchoolMatchType);
            }
            setQuery(newQuery);
        }
    }, [selectedMatchType, selectedDivisionType, selectedSchoolMatchType]);

    return (
        <div>
            {isLoading ? (
                <LoadingComp />
            ) : (
                <div className="matchesPage">
                    <div className="matchesPage__header">
                        <div className="matchesPage__header__header1">
                            <img src={kaveryLogo1} className="matchesPage__header__header1--img" />
                            <h1 className={`matchesPage__header__header1--${selectedMatchType}`}>
                                {selectedMatchType == 'LeagueTournament'
                                    ? 'Kauvery Hospital TDCA League Tournament'
                                    : selectedMatchType == 'KnockoutTournament'
                                    ? 'Kauvery Hospital TDCA Qualifying Knockout Tournament'
                                    : 'Match Details'}
                            </h1>
                        </div>
                        <div className="matchesPage__header__header2"></div>
                    </div>
                    <div className="matchesPage__matchSelect">
                        <select
                            className="matchesPage__matchTypeSelect--btn"
                            value={selectedMatchType}
                            onChange={switchMatchType}
                        >
                            <option>Select Type</option>
                            {matchTypes.map((matchType) => (
                                <option key={matchType} value={matchType}>
                                    {matchType == 'LeagueTournament'
                                        ? 'League Tournament'
                                        : matchType == 'KnockoutTournament'
                                        ? 'Knockout Tournament'
                                        : matchType == 'SchoolTournament'
                                        ? 'School Tournament'
                                        : 'Select Type'}
                                </option>
                            ))}
                        </select>
                        {selectedMatchType == 'LeagueTournament' ? (
                            <select
                                className="matchesPage__matchDivisionSelect--btn"
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
                        ) : null}
                        {selectedMatchType == 'SchoolTournament' ? (
                            <select
                                className="matchesPage__matchSchoolSelect--btn"
                                value={selectedSchoolMatchType}
                                onChange={switchSchoolMatchType}
                            >
                                <option>Select Type</option>
                                {schoolMatchTypes.map((schoolMatchType) => (
                                    <option key={schoolMatchType} value={schoolMatchType}>
                                        {schoolMatchType}
                                    </option>
                                ))}
                            </select>
                        ) : null}
                    </div>
                    <div className="matchesPage__matchCards">
                        {docs
                            .map((doc) => Match.fromFirestore(doc))
                            ?.map((matchDoc) => (
                                <MatchCard matchDoc={matchDoc} key={matchDoc.matchId} />
                            ))}
                    </div>

                    <div className="matchesPage__matchPageSelect">
                        {docs.length !== 0 ? (
                            isStart ? null : (
                                <button className="matchesPage__matchPageSelect--btn" onClick={() => getPrev()}>
                                    Previous
                                </button>
                            )
                        ) : null}

                        {isEnd ? null : (
                            <button className="matchesPage__matchPageSelect--btn" onClick={() => getNext()}>
                                Next
                            </button>
                        )}
                    </div>
                    {/* <Footer /> */}
                </div>
            )}
        </div>
    );
};

export default MatchesPage;
