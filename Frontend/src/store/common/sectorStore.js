import {defineStore} from 'pinia'
import {loadSector} from '@/services/common'

export const useSectorStore = defineStore({
    id: 'sector',
    state: () => ({
        sectors: [],
        hasData: false,
    }),
    actions: {
        setSectors(sectors) {
            this.sectors = sectors;
            this.hasData = true;
        },
        async loadSectors() {
            if(!this.hasData) {
                const sectors = await loadSector();
                this.setSectors(sectors);
            }
        }
    }
})