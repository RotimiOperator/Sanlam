import React, { useEffect, useState, useContext, useCallback } from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity, RefreshControl } from 'react-native';
import Authenticated from '../Layouts/Authenticated';
import Button from '../Components/Button';
import Currency from '../Components/Currency';
import styles, { constants } from '../Shared/Styles';
import { delLocalData, getLocalData, setLocalData } from '../Data/LocalStorage';
import { AppContext } from '../Data/AppContext';
import APIs from '../Data/APIs';
import SVG from '../Components/SVG';
import { PlusCircle } from '../Components/Icon';
import ModalBottom from '../Components/ModalBottom';

export default function Dashboard({ navigation }) {
  const { appData, readFromStorage } = useContext(AppContext);
  
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  useEffect(() => {
    onRefresh();
  }, []);

  useEffect(() => {
    if(refreshing) {
        APIs.Authenticated()
        .then(response => {
            //console.log(response.data);
            if (response.status === 200) {
                setLocalData('user', response.data.user);
                readFromStorage();
            }
        })
        .catch(error => {
            //console.error(error);
        });
    }
  }, [refreshing]);


  return (
    <Authenticated>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >

            <View style={[styles.row, styles.margin_xl.t]}>
                <Image
                    style={[styles.avatar, styles.start, styles.margin_sm.e]}
                    source={appData?.user?.userProfile ?? null}
                    resizeMode="contain"
                />
                <Text style={[styles.text_lg, styles.start, {marginTop: 3}]}>Hi {appData?.user?.user?.name}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ComingSoon')} style={[styles.end, {marginLeft: 'auto'}]}>
                    <SVG
                        width={25}
                        height={30}
                        style={[{marginTop: -35}]}
                        fill={constants.color.primary}
                        d="M25 6.25001C25 8.93056 22.8194 11.1111 20.1389 11.1111C17.4583 11.1111 15.2778 8.93056 15.2778 6.25001C15.2778 3.56945 17.4583 1.3889 20.1389 1.3889C22.8194 1.3889 25 3.56945 25 6.25001ZM22.2222 13.5972C21.5278 13.7778 20.8333 13.8889 20.1389 13.8889C18.1141 13.8852 16.1732 13.0792 14.7414 11.6475C13.3097 10.2157 12.5037 8.27484 12.5 6.25001C12.5 4.20834 13.3056 2.36112 14.5833 0.986118C14.3313 0.677147 14.0135 0.428299 13.6531 0.257707C13.2927 0.0871155 12.8987 -0.000922923 12.5 7.2954e-06C10.9722 7.2954e-06 9.72222 1.25001 9.72222 2.77778V3.18056C5.59722 4.40278 2.77778 8.19445 2.77778 12.5V20.8333L0 23.6111V25H25V23.6111L22.2222 20.8333V13.5972ZM12.5 29.1667C14.0417 29.1667 15.2778 27.9306 15.2778 26.3889H9.72222C9.72222 27.1256 10.0149 27.8321 10.5358 28.3531C11.0567 28.874 11.7633 29.1667 12.5 29.1667Z"
                    />
                </TouchableOpacity>
            </View>


            <View style={[styles.bg_color_secondary, styles.radius_md, styles.padding_md.y]}>
                <TouchableOpacity>
                    <View style={{flex: 1}}>
                        <View style={[styles.page]}>
                            <Text style={[styles.center, styles.text_md, styles.text_color_white]}>Assets under holding</Text>
                            <Text style={[styles.center, styles.text_md, styles.text_color_white]}>{appData?.assets?.amount ?? '---'}</Text>
                            <View style={[styles.center, {flexDirection: 'row'}]}>
                                <Image
                                    style={[styles.center, {width: 15, height: 15, marginBottom: 12, marginRight: 5}]}
                                    source={require('../../assets/images/naira.png')}
                                    resizeMode="contain"
                                />
                                <Text style={[styles.center, styles.text_xl, styles.text_color_white, styles.fw_bolder]}><Currency amount={appData?.user?.stats?.assets ?? 0} /></Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>


            <TouchableOpacity onPress={() => navigation.navigate('ComingSoon')} style={[styles.end, {marginLeft: 'auto'}]}>
                <Text style={[styles.text_sm, styles.center, styles.margin_xs.y]}>View All</Text>
            </TouchableOpacity>

                {appData?.user?.transactions?.length > 0 ? appData?.user?.transactions.map((transaction, index) => 
                <View style={[styles.margin_md.b]} key={index}>
                    <View style={[styles.bg_color_primary, styles.padding_xs.xy]}>
                        <Text style={[styles.text_sm]}>{new Date(transaction.transactionDate).toDateString()}</Text>
                    </View>
                    <View style={[styles.row, {marginVertical: 20}]}>
                        <SVG
                            width={25}
                            height={20}
                            style={[styles.margin_md.e]}
                            fill={constants.color.primary}
                            d="M19 0H9C8.20435 0 7.44129 0.316071 6.87868 0.87868C6.31607 1.44129 6 2.20435 6 3V10C6 10.7956 6.31607 11.5587 6.87868 12.1213C7.44129 12.6839 8.20435 13 9 13H19C19.7956 13 20.5587 12.6839 21.1213 12.1213C21.6839 11.5587 22 10.7956 22 10V3C22 2.20435 21.6839 1.44129 21.1213 0.87868C20.5587 0.316071 19.7956 0 19 0ZM20 10C20 10.2652 19.8946 10.5196 19.7071 10.7071C19.5196 10.8946 19.2652 11 19 11H9C8.73478 11 8.48043 10.8946 8.29289 10.7071C8.10536 10.5196 8 10.2652 8 10V3C8 2.73478 8.10536 2.48043 8.29289 2.29289C8.48043 2.10536 8.73478 2 9 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V10ZM16.5 6C16.1298 6.00125 15.7733 6.14028 15.5 6.39C15.285 6.19455 15.0178 6.06577 14.7309 6.0193C14.4441 5.97284 14.1499 6.01069 13.8842 6.12826C13.6185 6.24582 13.3926 6.43805 13.234 6.68157C13.0755 6.92509 12.9911 7.20942 12.9911 7.5C12.9911 7.79058 13.0755 8.07491 13.234 8.31843C13.3926 8.56195 13.6185 8.75418 13.8842 8.87174C14.1499 8.98931 14.4441 9.02716 14.7309 8.9807C15.0178 8.93423 15.285 8.80545 15.5 8.61C15.6806 8.77413 15.8985 8.89172 16.1348 8.95258C16.3711 9.01344 16.6187 9.01572 16.8561 8.95923C17.0935 8.90274 17.3135 8.78919 17.4971 8.62842C17.6807 8.46765 17.8223 8.26452 17.9096 8.03664C17.9969 7.80877 18.0273 7.56304 17.9981 7.32076C17.969 7.07848 17.8812 6.84697 17.7423 6.64632C17.6034 6.44567 17.4177 6.28192 17.2012 6.1693C16.9847 6.05667 16.744 5.99856 16.5 6ZM15 15C14.7348 15 14.4804 15.1054 14.2929 15.2929C14.1054 15.4804 14 15.7348 14 16V17C14 17.2652 13.8946 17.5196 13.7071 17.7071C13.5196 17.8946 13.2652 18 13 18H3C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V13H3C3.26522 13 3.51957 12.8946 3.70711 12.7071C3.89464 12.5196 4 12.2652 4 12C4 11.7348 3.89464 11.4804 3.70711 11.2929C3.51957 11.1054 3.26522 11 3 11H2V10C2 9.73478 2.10536 9.48043 2.29289 9.29289C2.48043 9.10536 2.73478 9 3 9C3.26522 9 3.51957 8.89464 3.70711 8.70711C3.89464 8.51957 4 8.26522 4 8C4 7.73478 3.89464 7.48043 3.70711 7.29289C3.51957 7.10536 3.26522 7 3 7C2.20435 7 1.44129 7.31607 0.87868 7.87868C0.31607 8.44129 0 9.20435 0 10V17C0 17.7956 0.31607 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H13C13.7956 20 14.5587 19.6839 15.1213 19.1213C15.6839 18.5587 16 17.7956 16 17V16C16 15.7348 15.8946 15.4804 15.7071 15.2929C15.5196 15.1054 15.2652 15 15 15ZM5 16H6C6.26522 16 6.51957 15.8946 6.70711 15.7071C6.89464 15.5196 7 15.2652 7 15C7 14.7348 6.89464 14.4804 6.70711 14.2929C6.51957 14.1054 6.26522 14 6 14H5C4.73478 14 4.48043 14.1054 4.29289 14.2929C4.10536 14.4804 4 14.7348 4 15C4 15.2652 4.10536 15.5196 4.29289 15.7071C4.48043 15.8946 4.73478 16 5 16Z"
                        />
                        <Text style={[styles.text_sm, styles.start]}>Transaction</Text>
                        <Text style={[styles.text_sm, styles.end, {marginLeft: 'auto'}, ((transaction.transactionType === 'WITHDRAWAL') ? styles.text_color_danger : styles.text_color_success)]}> {((transaction.transactionType === 'WITHDRAWAL') ? "-" : "+")}<Currency amount={transaction.transactionAmount} /></Text>
                    </View>
                </View>
                ) : (
                    <View style={[styles.center, styles.text_color_gray]}>
                        <View style={[styles.center, styles.margin_sm.y, styles.padding_md.xy]}>
                            <SVG
                                width={36}
                                height={60}
                                fill={constants.color.gray}
                                style={[styles.center]}
                                d="M0 0V18H0.0300007L0 18.03L12 30L0 42L0.0300007 42.03H0V60H36V42.03H35.97L36 42L24 30L36 18.03L35.97 18H36V0H0ZM30 43.5V54H6V43.5L18 31.5L30 43.5ZM18 28.5L6 16.5V6H30V16.5L18 28.5Z"
                            />
                        </View>
                        <Text style={[styles.text_md, styles.text_color_gray]}>No transactions yet</Text>
                    </View>
                )}


      </ScrollView>
    </Authenticated>
    );
}
