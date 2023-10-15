import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileSummary = (props) => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/gojo.jpg')} style={styles.avatar} />
            <Text style={styles.name}>Gojo Satoru</Text>
            <Text style={styles.quote}>"I've Always Been A Nice Guy..."</Text>
            <View style={styles.divider} />
            <View style={styles.stats}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}> {/* props.num_daily*/} 8</Text>
                    <Text style={styles.statLabel}>Daily</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{/* props.num_weekly */}5</Text>
                    <Text style={styles.statLabel}>Weekly</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{/* props.num_monthly */}4</Text>
                    <Text style={styles.statLabel}>Monthly</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        width: 300,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 5
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    quote: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: 'lightgray',
        marginBottom: 10
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    statItem: {
        alignItems: 'center'
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    statLabel: {
        fontSize: 14,
        color: 'gray'
    }
});

export default ProfileSummary;