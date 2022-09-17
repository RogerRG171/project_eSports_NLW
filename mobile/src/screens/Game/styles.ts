import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 32,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 0,
        marginTop: 8,
        justifyContent: 'space-between'
    },
    logo: {
        width: 72,
        height: 40,

    },
    right: {
        width: 20,
        height: 20,
    },
    cover: {
        width: 311,
        height: 160,
        borderRadius: 8,
        marginTop: 24,

    },
    containerList: {
        width: '100%',

    },
    contentList: {
        paddingTop: 24,
        paddingRight: 64,
        alignItems: 'flex-start',
    },
    heading: {
        padding: 0,
        margin: 0,
        marginTop: 4,
    },
    emptyListText: {
        color: THEME.COLORS.CAPTION_300,
        fontSize: THEME.FONT_SIZE.SM,
        fontFamily: THEME.FONT_FAMILY.REGULAR,

    },
    emptyListContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    }
});