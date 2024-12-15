import React, { useRef, useEffect, useState, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './DiscoverPage.scss'
import * as actions from "../../../store/actions";
import StarRatings from 'react-star-ratings';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { getDiscoverMovie } from '../../../services/movieService';
import { LANGUAGES } from '../../../untils';
import moment from 'moment/moment';
import { useOnlineStatus } from '../../../components/CustomHook/useOnlineStatus';
const TruncateString = ({ text, fontsize, weight }) => {
    const parentRef = useRef(null);
    const [truncatedText, setTruncatedText] = useState(text);

    useEffect(() => {
        const parent = parentRef.current;
        // console.log(parent);
        const span = document.createElement('span');
        span.style.visibility = 'hidden';
        span.style.whiteSpace = 'nowrap';
        span.style.fontSize = fontsize;
        span.style.fontWeight = weight;
        document.body.appendChild(span);

        let truncated = text;
        span.innerText = truncated;
        //console.log("span.offsetWidth: ", span.offsetWidth, "parent.offsetWidth: ", parent.offsetWidth);

        while (span.offsetWidth > parent.offsetWidth) {
            truncated = truncated.slice(0, -1);
            span.innerText = truncated + '...';
        }
        setTruncatedText(span.textContent);
        document.body.removeChild(span);
    }, [text]);

    return (
        <div ref={parentRef} style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            {truncatedText}
        </div>
    );
}
const PaginationPage = ({ currentPage, total_pages, discover, setCurrentPage }) => {
    const [listPage, setListPage] = useState([]);
    const [total, setTotal] = useState(total_pages);
    const [check, setCheck] = useState({
        first: false,
        end: false,
    });
    const list = [];
    useEffect(() => {
        checkListPage();
    }, [currentPage, total_pages])
    const checkListPage = () => {
        if (total_pages > 500) {
            console.log("Check total:", total);
            setTotal(500);
        } else {
            setTotal(total_pages)
        }
        if (total_pages < 5) {
            const list = [];
            console.log(total_pages);
            for (let i = 2; i < total_pages; i++) {
                list.push(i)
            }
            console.log(list);
            setListPage(list)
        }
        if (currentPage - 4 <= 0 && total_pages > 5) {
            console.log("check 1", currentPage);
            setListPage([2, 3, 4, 5]);
        }
        if (total - currentPage <= 4 && total_pages > 5) {
            console.log("check 2", currentPage);
            for (let i = total - 5; i < total; i++) {
                list.push(i);
            }
            setListPage(list);
        }
        if (total - currentPage > 4 && currentPage - 4 > 0 && total > 5) {
            console.log("check 3", currentPage);
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                list.push(i);
            }
            setListPage(list)
        }
    }
    return (
        <>
            <div className={currentPage === 1 ? 'page-num display-c-c active' : 'page-num display-c-c'} onClick={() => setCurrentPage({ ...discover, page: 1 })}>1</div>
            {(total - currentPage <= 4 === true || (total - currentPage > 4 && currentPage - 4 > 0)) && total > 5 &&
                <div div className='spacing display-c-c'>...</div>
            }
            {
                listPage && listPage.length > 0 &&
                listPage.map((item, index) => {
                    return (
                        <div className={currentPage === item ? 'page-num display-c-c active' : 'page-num display-c-c'} onClick={() => setCurrentPage({ ...discover, page: item })}>{item}</div>
                    )
                })
            }
            {
                (currentPage - 4 <= 0 === true || (total - currentPage > 4 && currentPage - 4 > 0)) && total > 5 &&
                <div className='spacing display-c-c'>...</div>
            }
            <div className={currentPage === total ? 'page-num display-c-c active' : 'page-num display-c-c'} onClick={() => setCurrentPage({ ...discover, page: total })}>
                {total}
            </div>
        </>
    )
}
function DiscoverPage(props) {
    const [user, setUser] = useState({
        userName: '',
        password: ''
    })
    const [countries, setCountries] = useState([
        { id: 0, nameVI: "Việt Nam", nameEn: "Vietnam", iso: "VN" },
        { id: 1, nameVI: "Hàn quốc", nameEn: "Korea", iso: "KR" },
        { id: 2, nameVI: "Mỹ", nameEn: "United States", iso: "US" },
        { id: 3, nameVI: "Vương quốc Anh", nameEn: "United Kingdom", iso: "GB" },
        { id: 4, nameVI: "Pháp", nameEn: "France", iso: "FR" },
        { id: 5, nameVI: "Canada", nameEn: "Canada", iso: "CA" },
        { id: 6, nameVI: "Hồng Kông", nameEn: "Hong Kong", iso: "HK" },
        { id: 7, nameVI: "Nhật Bản", nameEn: "Japan", iso: "JP" },
        { id: 8, nameVI: "Trung Quốc", nameEn: "China", iso: "CN" },
        { id: 9, nameVI: "Ấn Độ", nameEn: "India", iso: "IN" },
        { id: 10, nameVI: "Thái Lan", nameEn: "Thailand", iso: "TH" },
        { id: 11, nameVI: "Úc", nameEn: "Australia", iso: "AU" },
        { id: 12, nameVI: "Đức", nameEn: "Germany", iso: "DE" },
        { id: 13, nameVI: "Thụy Điển", nameEn: "Sweden", iso: "SE" },
        { id: 14, nameVI: "Ý", nameEn: "Italy", iso: "IT" },
        { id: 15, nameVI: "Tây Ban Nha", nameEn: "Spain", iso: "ES" },
    ])
    const [year, setYear] = useState([
        { year: "2024", value: 2024 },
        { year: "2023", value: 2023 },
        { year: "2022", value: 2022 },
        { year: "2021", value: 2021 },
        { year: "2020", value: 2020 },
        { year: "2019", value: 2019 },
        { year: "2018", value: 2018 },
        { year: "2017", value: 2017 },
        { year: "2016", value: 2016 },
        { year: "2015", value: 2015 },
        { year: "2014", value: 2014 },
        { year: "2013", value: 2013 },
        { year: "trước 2012", value: 2012 },
    ])
    const [runtime, setRuntime] = useState([
        { id: 0, runtime: { GTE: '', LTE: '' }, nameVN: "- Tất cả - ", nameEn: "- ALL -" },
        { id: 1, runtime: { GTE: 0, LTE: 30 }, nameVN: "Dưới 30 phút", nameEn: "Under 30 minutes" },
        { id: 2, runtime: { GTE: 30, LTE: 60 }, nameVN: "30' - 1 tiếng", nameEn: "30' - 1 hour" },
        { id: 3, runtime: { GTE: 60, LTE: 90 }, nameVN: "1 - 1.5 tiếng", nameEn: "1 - 1.5 hours" },
        { id: 4, runtime: { GTE: 90, LTE: 120 }, nameVN: "1.5 - 2 tiếng ", nameEn: "1.5 - 2 hours" },
        { id: 5, runtime: { GTE: 120, LTE: 99999 }, nameVN: "Trên 2 tiếng", nameEn: "Over 2 hours" },
    ])
    const [discover, setDiscover] = useState({
        typeMovie: "movie",
        genres: "",
        nation: "",
        year: "",
        time: {
            GTE: 0,
            LTE: 9999,
        },
        sort: "popularity.desc",
        page: 1
    })
    const [listMovie, setListMovie] = useState([])
    const [favor, setFavor] = useState(false)
    const isOnline = useOnlineStatus();
    const { language, typeMovie, genresMovie } = useSelector(state => (
        {
            language: state.app.language,
            typeMovie: state.movie.typeMovie,
            genresMovie: state.movie.genresMovie
        }
    ))
    const [wishlist, setWishlist] = useState(false)
    const [optionView, setOptionView] = useState(false)
    const dispatch = useDispatch()
    const fetchMovieList = async () => {
        let movie = await getDiscoverMovie(discover.typeMovie, discover.genres, discover.nation, discover.year, discover.time, discover.sort, language, discover.page)
        setListMovie(movie)
    }
    useEffect(() => {
        dispatch(actions.fetchGenresMovie(language))
    }, [language, typeMovie])
    useEffect(() => {
        fetchMovieList()
    }, [discover, language])
    const setRuntimeById = (id) => {
        console.log(parseInt(id, 10));

        setDiscover({ ...discover, time: runtime[parseInt(id, 10)].runtime, page: 1 })
    }
    const hanldeWatchMovie = (id) => {
        dispatch(actions.setSideInfo(false))
        window.scrollTo(0, 0)
        props.history.push(`/${discover.typeMovie}/${id}`)
    }
    const checkS = (time) => {
        if (language == LANGUAGES.EN) {
            if (time > 1) {
                return 's'
            }
            else {
                return ''
            }
        } else {
            return ''
        }
    }
    const checkGenres = (id) => {
        if (genresMovie && genresMovie.genres && genresMovie.genres.length > 0) {
            console.log("check id", id, genresMovie.genres);
            let gen = genresMovie.genres.find(item => {
                item.id = id
            });
            console.log("Check genres", gen);
            return gen;
        }
    }
    //console.log("check genres: ", genresMovie);
    console.log("check list movie: ", listMovie);
    return (
        <>

            <div className='container-dis-page text-white'>
                {isOnline ? '✅ Online' : '❌ Disconnected'}
                <div className='content-search'>
                    <div className='option-search'>
                        <label for="type-movie">Loại phim:</label>
                        <select name="type-movie" id="type-movie" onChange={(event) => setDiscover({ ...discover, typeMovie: event.currentTarget.value, page: 1 })}>
                            <option value="movie">- Tất cả -</option>
                            <option value="tv" >Phim bộ</option>
                            <option value="movie">Phim lẻ</option>
                        </select>
                    </div>
                    <div className='option-search'>
                        <label for="type-movie">Thể loại:</label>
                        <select name="type-movie" id="type-movie" onChange={(e) => setDiscover({ ...discover, genres: e.currentTarget.value, page: 1 })}>
                            <option value="">- Tất cả -</option>
                            {genresMovie && genresMovie.genres && genresMovie.genres.length > 0 &&
                                genresMovie.genres.map((item, index) => {
                                    if (item.name.includes("Phim") == true || language == LANGUAGES.EN) {
                                        return (
                                            <option value={item.id}>{item.name.replace('Phim ', '')}</option>
                                        )
                                    }
                                })
                            }
                        </select>
                    </div>
                    <div className='option-search'>
                        <label for="type-movie">Quốc gia:</label>
                        <select name="type-movie" id="type-movie" onChange={(e) => setDiscover({ ...discover, nation: e.currentTarget.value, page: 1 })}>
                            <option value="">- Tất cả -</option>
                            {countries && countries.length > 0 &&
                                countries.map((item, index) => {
                                    return (
                                        <option value={item.iso}>{language == LANGUAGES.VI ? item.nameVI : item.nameEn}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='option-search'>
                        <label for="type-movie">Năm:</label>
                        <select name="type-movie" id="type-movie" onChange={(e) => setDiscover({ ...discover, year: e.currentTarget.value, page: 1 })}>
                            <option value="">- Tất cả -</option>
                            {year && year.length > 0 &&
                                year.map((item, index) => {
                                    return (
                                        <option value={item.value}>{item.year}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='option-search'>
                        <label for="type-movie">Thời lượng:</label>
                        <select name="type-movie" id="type-movie" onChange={(e) => setRuntimeById(e.target.value)}>
                            {runtime && runtime.length > 0 &&
                                runtime.map((item, index) => {
                                    return (
                                        <option value={item.id}>{language == LANGUAGES.VI ? item.nameVN : item.nameEn}</option>
                                    )

                                })
                            }
                        </select>
                    </div>
                    <div className='option-search'>
                        <label for="type-movie">Sắp xếp:</label>
                        <select name="type-movie" id="type-movie" onChange={(e) => setDiscover({ ...discover, sort: e.currentTarget.value, page: 1 })}>
                            <option value="popularity.desc" >Độ phổ biến</option>
                            <option value="primary_release_date.desc">Ngày phát hành</option>
                            <option value="vote_average.desc" >Điểm đánh giá</option>
                        </select>
                    </div>
                    <div className='option-search'>
                        <label for="type-movie">Hiển thị:</label>
                        <div className='option-view'>
                            <i className={optionView == true ? "fas fa-list active" : "fas fa-list"}
                                onClick={() => setOptionView(!optionView)}
                            ></i>
                            <i className={optionView == false ? "fas fa-th active" : "fas fa-th"}
                                onClick={() => setOptionView(!optionView)}
                            ></i>
                        </div>
                    </div>
                </div>
                <Suspense fallback={<Loading />}>
                    {optionView == false &&
                        <div className='content-view'>
                            {listMovie && listMovie.results && listMovie.results.length > 0 &&
                                listMovie.results.map((item, index) => {
                                    return (
                                        <div className='section-movie' onClick={() => hanldeWatchMovie(item.id)}>
                                            <div className='logo-m' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})` }}>
                                                <div className='star'>
                                                    <StarRatings
                                                        rating={item.vote_average / 2}
                                                        starDimension="28px"
                                                        starSpacing="2px"
                                                        starRatedColor="#07b8a0"
                                                    />
                                                </div>
                                                <div className='list-btn'>
                                                    <div className='btn-watch display-c-c' onClick={() => hanldeWatchMovie(item.id)}>Xem ngay</div>
                                                    <div className='btn-add display-c-c' onClick={(e) => { e.stopPropagation(); setWishlist(!wishlist); }}>
                                                        <i className={wishlist && wishlist == true ? 'fas fa-check' : 'fas fa-plus'}></i>
                                                    </div>
                                                    <div className='btn-favor display-c-c' onClick={(e) => { e.stopPropagation(); setFavor(!favor) }}>
                                                        <i className={favor && favor == true ? 'fas fa-heart' : 'far fa-heart'}></i>
                                                    </div>
                                                </div>
                                                {item.poster_path === null &&
                                                    <div className='non-bg display-c-c'>
                                                        <i class="fas fa-image"></i>
                                                    </div>
                                                }

                                            </div>
                                            <div className='title-m'><TruncateString text={item.title} fontsize={"1.1rem"} weight={"600"} /></div>
                                            <div className='title-o-m'><TruncateString text={item.original_title} fontsize={"1rem"} weight={"400"} /></div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </Suspense >
                {optionView == true &&
                    <div className='content-view-list'>
                        {listMovie && listMovie.results && listMovie.results.length > 0 &&
                            listMovie.results.map((item, index) => {
                                return (
                                    <div className='section-movie'>
                                        <div className='content-left'>
                                            <div className='poster-m' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})` }}></div>
                                        </div>
                                        <div className='content-right'>
                                            <div className='title-m'>{item.title}</div>
                                            <div className='o-title'>{item.original_title}</div>
                                            <StarRatings
                                                rating={item.vote_average / 2}
                                                starDimension="1.5rem"
                                                starSpacing="2px"
                                                starRatedColor="#07b8a0"
                                            />
                                            <div className='list-genres'>
                                                {item && item.genre_ids && item.genre_ids.length > 0 &&
                                                    item.genre_ids.map((item, index) => {
                                                        console.log(checkGenres(item));
                                                    })
                                                }

                                            </div>
                                            <div className='overview-movie'>
                                                {item.overview}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                <div className='content-pageNum'>
                    <div className='left'>
                        {listMovie && listMovie.total_results > 0 &&
                            <PaginationPage
                                total_pages={listMovie.total_pages}
                                currentPage={discover.page}
                                discover={discover}
                                setCurrentPage={setDiscover}
                            />
                        }
                    </div>
                    <div className='right'>
                        <div className={discover.page == 1 ? 'btn-prev display-c-c none disable' : 'btn-prev display-c-c'}
                            onClick={() => setDiscover({ ...discover, page: discover.page - 1 })}
                        >
                            Previous
                        </div>
                        <div className={listMovie && (listMovie.total_pages == discover.page || discover.page == 500) ? 'btn-next display-c-c disable' : 'btn-next display-c-c'}
                            onClick={() => setDiscover({ ...discover, page: discover.page + 1 })}
                        >
                            Next
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
function Loading() {
    return <h2>🌀 Loading...</h2>;
}



export default withRouter(DiscoverPage);