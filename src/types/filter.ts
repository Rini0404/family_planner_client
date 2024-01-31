export enum SelectedMember {
    EVERYONE = 'Everyone',
    ME = 'Me'
}

export enum DateChosen {
    TODAY = 'Today',
    CUSTOM = 'Custom'
}

export type FilterOptions = {
    member: string | SelectedMember.EVERYONE
    date: Date | null
    status: string
}
