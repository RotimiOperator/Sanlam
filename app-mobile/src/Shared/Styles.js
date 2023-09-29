import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import fonts from './Fonts';
import designSystem from './DesignSystem';

/**
 *
 *  Style Chaetsheet
 *    Constants
 *    Variables
 *    App, Container, Logo, Cards, Images, Modal, Activity
 *    Text
 *    Form Components
 *    Buttons
 *    App Styles
 **/

/*************************
 *  * Constants
 **************************/
export const constants = designSystem.constants;

  
const styles = StyleSheet.create({
  /*************************
   *  Variables
   **************************/
  ...designSystem.styles,
  center: {
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  start: {
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  end: {
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  space_between: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    marginVertical: constants.margin.lg,
  },


  /*************************
   *  App, Container, Logo, Cards, Images, Modal, Activity
   **************************/
  app: {
    flex: 1,
    backgroundColor: constants.color.white,
    paddingTop: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    backgroundColor: constants.color.white,
    paddingHorizontal: constants.padding.lg,
    //paddingVertical: constants.padding.xs,
  },
  logo: {
    maxWidth: 200,
  },
  page: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  header: {
    backgroundColor: constants.color.white,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingTop: constants.padding.xs,
  },
  header_rounded: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingTop: constants.padding.lg,
    paddingHorizontal: constants.padding.xl,
  },
  footer: {
    height: 70,
    backgroundColor: constants.color.secondary,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    padding: constants.padding.xs,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  bars: {
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: constants.margin.lg,
  },
  bar: {
    flex: 1,
    maxWidth: 50,
    justifyContent: 'center',
    backgroundColor: constants.color.primary,
    paddingHorizontal: constants.radius.xs,
    paddingVertical: constants.radius.sm,
    marginHorizontal: constants.margin.xs,
    borderRadius: constants.radius.lg,
  },
  illustration: {
    width: '100%',
    height: '70%',
  },
  modalBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#475156cc',
  },
  modalView: {
    margin: 20,
    backgroundColor: constants.color.secondary,
    borderRadius: 8,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalBottomBody: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#475156cc',
  },
  modalBottomView: {
    backgroundColor: constants.color.secondary,
    padding: 20,
    paddingTop: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    elevation: 5,
    width: '100%',
  },
  modalBottomSliderIndicatorRow: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBottomSliderIndicator: {
    backgroundColor: constants.color.primary,
    borderRadius: 30,
    height: 4,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '45%',
  },
  activity: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    justifyContent: 'center',
    alignItems: 'center',
  },


  /*************************
   *  Text
   **************************/
  fw_normal: {
    fontWeight: fonts.weight.normal,
    fontFamily: fonts.family.normal,
  },
  fw_bold: {
    fontWeight: fonts.weight.normal,
    fontFamily: fonts.family.bold,
  },
  fw_bolder: {
    fontWeight: fonts.weight.normal,
    fontFamily: fonts.family.bolder,
  },
  text_s: {
    color: constants.color.black,
    fontSize: fonts.size.s,
    fontWeight: fonts.weight.normal,
    fontFamily: fonts.family.normal,
  },
  text_xs: {
    color: constants.color.black,
    fontSize: fonts.size.xs,
    fontWeight: fonts.weight.normal,
    fontFamily: fonts.family.normal,
  },
  text_sm: {
    color: constants.color.black,
    fontSize: fonts.size.sm,
    fontWeight: fonts.weight.normal,
    fontFamily: fonts.family.normal,
  },
  text_md: {
    color: constants.color.black,
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.normal,
    fontFamily: fonts.family.normal,
  },
  text_lg: {
    color: constants.color.black,
    fontSize: fonts.size.lg,
    fontWeight: fonts.weight.normal,
    fontFamily: fonts.family.normal,
  },
  text_xl: {
    color: constants.color.black,
    fontSize: fonts.size.xl,
    fontWeight: fonts.weight.normal,
    fontFamily: fonts.family.normal,
  },


  /*************************
   *  Form Components
   **************************/
  form: {
    backgroundColor: '#fff',
  },
  field: {
    marginBottom: constants.margin.lg,
  },
  input: {
    padding: constants.padding.md,
    borderRadius: constants.radius.md,
    borderColor: constants.color.primary,
    borderWidth: constants.width.xs,
  },
  password_icon: {
    position: 'absolute',
    marginTop: constants.padding.xl,
    marginLeft: '90%',
  },
  date_icon: {
    position: 'absolute',
    marginTop: constants.padding.md,
    marginLeft: '90%',
  },
  


  /*************************
   *  Buttons
   **************************/
  button_stretch: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  button_sm: {
    fontSize: fonts.size.sm,
    fontWeight: fonts.weight.normal,
    fontFamily: fonts.family.normal,
    padding: constants.padding.sm,
    borderRadius: constants.radius.sm,
  },
  button_md: {
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.normal,
    fontFamily: fonts.family.normal,
    padding: constants.padding.md,
    borderRadius: constants.radius.md,
  },
  button_lg: {
    fontSize: fonts.size.lg,
    fontWeight: fonts.weight.normal,
    fontFamily: fonts.family.normal,
    padding: constants.padding.lg,
    borderRadius: constants.radius.lg,
  },
  


  /*************************
   *  App Styles
   **************************/
  /*  Avatar  */
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: constants.color.primary,
  },
  


});

export default styles;
