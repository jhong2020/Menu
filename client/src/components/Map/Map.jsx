// import React, { useEffect } from 'react';
// import './Map.css';

// const Map = () => {
//     useEffect(() => {
//         const loadKakaoMapScript = () => {
//             return new Promise((resolve, reject) => {
//                 if (window.kakao && window.kakao.maps) {
//                     resolve(window.kakao);
//                     return;
//                 }
//                 const script = document.createElement('script');
//                 script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=8152580c60599c4bcfde8e9a239e9c91&autoload=false&libraries=services`;
//                 script.onload = () => {
//                     console.log("Kakao Maps API script loaded.");
//                     window.kakao.maps.load(() => {
//                         resolve(window.kakao);
//                     });
//                 };
//                 script.onerror = () => reject(new Error('Kakao Maps API failed to load'));
//                 document.head.appendChild(script);
//             });
//         };

//         loadKakaoMapScript()
//             .then((kakao) => {
//                 console.log("Kakao Maps API initialized.");

//                 const mapContainer = document.getElementById('map');
//                 if (!mapContainer) {
//                     console.error('Map container not found');
//                     return;
//                 }
//                 const mapOption = {
//                     center: new kakao.maps.LatLng(37.566826, 126.9786567),
//                     level: 3
//                 };
//                 const map = new kakao.maps.Map(mapContainer, mapOption);
//                 console.log("Map initialized:", map);

//                 const ps = new kakao.maps.services.Places();
//                 const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
//                 let markers = [];

//                 const searchPlaces = () => {
//                     const keyword = document.getElementById('keyword').value;
//                     console.log("Searching places for keyword:", keyword);
//                     if (!keyword.replace(/^\s+|\s+$/g, '')) {
//                         alert('키워드를 입력해주세요!');
//                         return false;
//                     }
//                     ps.keywordSearch(keyword, placesSearchCB);
//                 };

//                 const placesSearchCB = (data, status, pagination) => {
//                     console.log("Places search callback:", data, status, pagination);
//                     if (status === kakao.maps.services.Status.OK) {
//                         displayPlaces(data);
//                         displayPagination(pagination);
//                     } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
//                         alert('검색 결과가 존재하지 않습니다.');
//                     } else if (status === kakao.maps.services.Status.ERROR) {
//                         alert('검색 결과 중 오류가 발생했습니다.');
//                     }
//                 };

//                 const displayPlaces = (places) => {
//                     console.log("Displaying places:", places);
//                     const listEl = document.getElementById('placesList');
//                     const menuEl = document.getElementById('menu_wrap');
//                     const fragment = document.createDocumentFragment();
//                     const bounds = new kakao.maps.LatLngBounds();

//                     removeAllChildNodes(listEl);
//                     removeMarkers();

//                     places.forEach((place, i) => {
//                         const placePosition = new kakao.maps.LatLng(place.y, place.x);
//                         const marker = addMarker(placePosition, i);
//                         const itemEl = getListItem(i, place);
//                         bounds.extend(placePosition);

//                         (function (marker, title) {
//                             kakao.maps.event.addListener(marker, 'mouseover', () => {
//                                 displayInfowindow(marker, title);
//                             });

//                             kakao.maps.event.addListener(marker, 'mouseout', () => {
//                                 infowindow.close();
//                             });

//                             itemEl.onmouseover = () => {
//                                 displayInfowindow(marker, title);
//                             };

//                             itemEl.onmouseout = () => {
//                                 infowindow.close();
//                             };
//                         })(marker, place.place_name);

//                         fragment.appendChild(itemEl);
//                     });

//                     listEl.appendChild(fragment);
//                     menuEl.scrollTop = 0;
//                     map.setBounds(bounds);
//                 };

//                 const getListItem = (index, places) => {
//                     const el = document.createElement('li');
//                     let itemStr = `<span class="markerbg marker_${index + 1}"></span><div class="info"><h5>${places.place_name}</h5>`;
//                     if (places.road_address_name) {
//                         itemStr += `<span>${places.road_address_name}</span><span class="jibun gray">${places.address_name}</span>`;
//                     } else {
//                         itemStr += `<span>${places.address_name}</span>`;
//                     }
//                     itemStr += `<span class="tel">${places.phone}</span></div>`;
//                     el.innerHTML = itemStr;
//                     el.className = 'item';
//                     return el;
//                 };

//                 const addMarker = (position, idx) => {
//                     console.log("Adding marker:", position, idx);
//                     const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
//                     const imageSize = new kakao.maps.Size(36, 37);
//                     const imgOptions = {
//                         spriteSize: new kakao.maps.Size(36, 691),
//                         spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
//                         offset: new kakao.maps.Point(13, 37)
//                     };
//                     const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
//                     const marker = new kakao.maps.Marker({
//                         position,
//                         image: markerImage
//                     });
//                     marker.setMap(map);
//                     markers.push(marker);
//                     return marker;
//                 };

//                 const removeMarkers = () => {
//                     console.log("Removing markers");
//                     markers.forEach(marker => marker.setMap(null));
//                     markers = [];
//                 };

//                 const displayPagination = (pagination) => {
//                     console.log("Displaying pagination:", pagination);
//                     const paginationEl = document.getElementById('pagination');
//                     const fragment = document.createDocumentFragment();
//                     while (paginationEl.hasChildNodes()) {
//                         paginationEl.removeChild(paginationEl.lastChild);
//                     }
//                     for (let i = 1; i <= pagination.last; i++) {
//                         const el = document.createElement('a');
//                         el.href = '#';
//                         el.innerHTML = i;
//                         if (i === pagination.current) {
//                             el.className = 'on';
//                         } else {
//                             el.onclick = ((i) => {
//                                 return () => pagination.gotoPage(i);
//                             })(i);
//                         }
//                         fragment.appendChild(el);
//                     }
//                     paginationEl.appendChild(fragment);
//                 };

//                 const displayInfowindow = (marker, title) => {
//                     console.log("Displaying infowindow:", title);
//                     const content = `<div style="padding:5px;z-index:1;">${title}</div>`;
//                     infowindow.setContent(content);
//                     infowindow.open(map, marker);
//                 };

//                 const removeAllChildNodes = (el) => {
//                     console.log("Removing all child nodes:", el);
//                     while (el.hasChildNodes()) {
//                         el.removeChild(el.lastChild);
//                     }
//                 };

//                 document.getElementById('search-form').onsubmit = (e) => {
//                     e.preventDefault();
//                     searchPlaces();
//                 };

//                 searchPlaces();
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }, []);

//     // return (
//     //     <div className='map_wrap'>
//     //         <div id='map' style={{ width: '70%', height: '500px', position: 'relative', overflow: 'hidden', margin: '0 auto' }}></div>
//     //         <div id='menu_wrap' className='bg_white'>
//     //             <div className='option'>
//     //                 <div>
//     //                     <form id='search-form'>
//     //                         키워드 : <input type='text' id='keyword' size='15' defaultValue='이태원 맛집' />
//     //                         <button type='submit'>검색하기</button>
//     //                     </form>
//     //                 </div>
//     //             </div>
//     //             <hr />
//     //             <ul id='placesList'></ul>
//     //             <div id='pagination'></div>
//     //         </div>
//     //     </div>
//     // );
// };

// export default Map;
